CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text ,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
); 

INSERT INTO blogs (author, url, title, likes) VALUES
('Edsger W. Dijkstra', 'http://www.cs.utexas.edu/~EWD/','The world of computing is a mess', 5),
('Linus Torvalds', 'https://www.kernel.org/doc/html/latest/process/index.html','Linux kernel development', 10),
('Bjarne Stroustrup', 'https://www.stroustrup.com/bs_faq2.html','C++ programming language', 15);