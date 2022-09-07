const express = require('express');
const Router = express.Router();

const AuthorController = require("../Controllers/AuthorController")
const BlogController = require("../Controllers/BlogsController")
const commonMid = require("../middleware/auth")


Router.post("/authors", AuthorController.createAuthor)
Router.post("/login", AuthorController.loginAuthor)
Router.post("/blogs",commonMid.authenticate, BlogController.createBlog)
Router.get("/blogs",commonMid.authenticate,commonMid.authorized, BlogController.getBlog)
Router.put("/blogs/:blogId",commonMid.authenticate,commonMid.authorized, BlogController.putBlog)
Router.delete("/blogs/:blogId", BlogController.deletBlogs)
Router.delete("/blogs", BlogController.deletyqury)

module.exports = Router