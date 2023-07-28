const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null 

    return blogs.reduce((mostLiked, currentBlog) => {
        return currentBlog.likes > mostLiked.likes ? currentBlog : mostLiked
    })
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const authorCount = {}
    blogs.forEach((blog) => {
        if (authorCount.hasOwnProperty(blog.author)) {
            authorCount[blog.author]++
        } else {
            authorCount[blog.author] = 1
        }
    })

    let author = null
    let count = 0

    for(a in authorCount) {
        if (authorCount[a] > count) {
            count = authorCount[a]
            author = a 
        }
    }

    return { author: author, blogs: count }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const likeCount = {}
    blogs.forEach((blog) => {
        if (likeCount.hasOwnProperty(blog.author)) {
            likeCount[blog.author] += blog.likes
        } else {
            likeCount[blog.author] = blog.likes
        }
    })

    let author = null
    let likes = 0

    for (a in likeCount) {
        if (likeCount[a] > likes) {
            likes = likeCount[a]
            author = a
        }
    }

    return { author: author, likes: likes}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}