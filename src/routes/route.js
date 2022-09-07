const express = require('express');
const Router = express.Router();

const AuthorController = require("../Controllers/AuthorController")
const BlogController = require("../Controllers/BlogsController")


Router.post("/authors", AuthorController.createAuthor)
Router.post("/blogs", BlogController.createBlog)
Router.get("/blogs", BlogController.getBlog)
Router.put("/blogs/:blogId", BlogController.putBlog)
Router.delete("/blogs/:blogId", BlogController.deletBlogs)
Router.delete("/blogs", BlogController.deletyqury)

module.exports = Router