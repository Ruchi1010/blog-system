const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const hbs = require("hbs");
const { getBlog, updateBlog, deleteBlog } = require("./utils");

const app = express();
const port = 4040;

const publicDirectoryPath = path.join(__dirname, "../public");
const partialsDirectoryPath = path.join(__dirname, "../views/partials");

hbs.registerPartials(partialsDirectoryPath);
let blogs = [];

app.set("view engine", "hbs"); //templating engine handlebars

app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  if (blogs.length < 1) {
    return res.render("index", {
      message: "No Blog Added Yet, Please Comeback soon",
    });
  }
  res.render("index", {
    blogs,
  });
});
app.get("/blog/add", (req, res) => {
  res.render("addBlog");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/blog/add", (req, res) => {
  const blog = req.body;
  blogs.push({ ...blog, id: uuidv4() });
  res.render("index", {
    blogs,
  });
});

app.get("/blog/edit/:id", async (req, res) => {
  const { id } = req.params;
  let blog = await getBlog(blogs, id);
  if (!blog) {
    return res.render("index", {
      message: "No such blog found",
    });
  }
  res.render("editBlog", {
    blog,
  });
});

app.post("/blog/edit/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBlog = req.body;
  blogs = await updateBlog(blogs, id, updatedBlog);
  res.render("index", {
    blogs,
  });
});

app.get("/blog/remove/:id", async (req, res) => {
  const { id } = req.params;
  blogs = await deleteBlog(blogs, id);
  if (blogs.length < 1) {
    return res.render("index", {
      message: "No Blog Added Yet, Please Comeback soon",
    });
  }
  res.render("index", {
    blogs,
  });
});

app.get("/blog/view/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await getBlog(blogs, id);
  res.render("viewBlog", {
    blog,
  });
});

app.listen(port, () => {
  console.log(`Sever started at port http://localhost:${port}`);
});
