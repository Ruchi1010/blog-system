exports.getBlog = (blogs, id) => {
  for (const singleBlog of blogs) {
    if (singleBlog.id === id) {
      return singleBlog;
    }
  }
};

exports.updateBlog = (blogs, id, updatedBlog) => {
  let i = 0;
  for (const singleBlog of blogs) {
    if (singleBlog.id === id) {
      blogs[i] = updatedBlog;
    }
    i++;
  }
  return blogs;
};

exports.deleteBlog = (blogs, id) => {
  blogs = blogs.filter((blog) => blog.id !== id);
  return blogs;
};
