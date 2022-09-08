const express = require('express');
const Router = express.Router();

const AuthorController = require("../Controllers/AuthorController")
const BlogController = require("../Controllers/BlogsController")
const commonMid = require("../middleware/auth")

//--------------------------------ti
Router.post("/authors", AuthorController.createAuthor)
Router.post("/login", AuthorController.loginAuthor)
Router.post("/blogs",commonMid.authenticate1, BlogController.createBlog)
Router.get("/blogs",commonMid.authorizationByquery, BlogController.getBlog)
Router.put("/blogs/:blogId",commonMid.authenticate1,commonMid.authorizationByid, BlogController.updateBlog)
Router.delete("/blogs/:blogId",commonMid.authorizationByid, BlogController.deleteBlogs)
Router.delete("/blogs",commonMid.authorizationByquery, BlogController.deleteByquery)

module.exports = Router