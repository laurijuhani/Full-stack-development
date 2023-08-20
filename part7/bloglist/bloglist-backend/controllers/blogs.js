const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "no token available" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  if (!user) {
    return response(401).json({
      error: "You need to login in order to delete blogs",
    });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog.user.equals(user.id)) {
    return response
      .status(401)
      .json({ error: "You do not have the permission to delete this blog" });
  }

  await blog.deleteOne();
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    user: body.user,
    comments: body.comments,
  };

  if (body.likes) {
    blog.likes = body.likes;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  blog.comments.push(body.comment);

  const updatedBlog = await blog.save();

  response.json(updatedBlog);
});

module.exports = blogsRouter;
