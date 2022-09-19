 const BlogsModel = require("../Models/BlogsModel");
const AuthorModel = require("../Models/AuthorModel");

//==================================================createBlog==========================================//

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let { title, body, authorId, tags, category } = data;

    if (!title) {
      return res.status(400).send({ status: false, msg: "please provide the title" });
    }

    if (!body) {
      return res.status(400).send({ status: false, msg: "please provide the body" });
    }

    if (!authorId) {
      return res.status(400).send({ status: false, msg: "please provide the authorId" });
    }

    if (!tags) {
      return res.status(400).send({ status: false, msg: "please provide the tags" });
    }

    if (!category) {
      return res.status(400).send({ status: false, msg: "please provide the category" });
    }

    let authorid = await AuthorModel.findById({ _id: authorId });

    if (!authorid) {
      return res.status(400).send({ status: false, msg: "this authorId is not valid " });
    }

    let savedata = await BlogsModel.create(data);

    res.status(201).send({ status: true, msg: savedata });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
//=================================================getblog==================================================//
const getBlog = async function (req, res) {
  try {
    let data = req.query;
    let { authorId, tags, category, subcategory } = data;

    if (Object.keys(data).length == 0) {

      let blogs = await BlogsModel.find({ isDeleted: false, isPublished: true })

      if (blogs.length == 0) {
        return res.status(404).send({ status: false, msg: "No documents are found" })
      }
      else {
        return res.status(200).send(blogs);
      }
    }

    let Obj = { isDeleted: false };

    if (authorId) {
      Obj.authorId = authorId;
    }

    if (category) {
      Obj.category = category;
    }
    if (tags) {
      Obj.tags = tags;
    }
    if (subcategory) {
      Obj.subcategory = subcategory;
    }

    let blogDoc = await BlogsModel.find(Obj)

    if (blogDoc.length == 0) {
      return res.status(404).send({ status: false, msg: "blogdoc are not found" })
    }
    else {
      res.status(200).send({ status: true, data: blogDoc })
    }
  } catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
};
//=================================================putblog==========================================//

const updateBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let data = req.body;

    const { title, body, tags, subcategory } = data;

    let Id = await BlogsModel.findById({ _id: blogId });

    if (!Id) {
      return res.status(404).send({ status: false, msg: "blogid does not exist" });
    }

    let dataBlog = await BlogsModel.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      {
        $set: { title: title, body: body, isPublished: true, publishedAt: Date.now() },
        $push: { tags: tags, subcategory: subcategory }
      },
      { new: true }
    );
    if (!dataBlog)
      return res.status(404).send({ status: false, msg: "dataBlog is not exist" })

    res.status(200).send({ status: true, msg: "Document Updated Successfully", data: dataBlog })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error })
  }
};

//======================================================deletedblog==================================//

const deleteBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId;

    // let Id = await BlogsModel.findById(blogId);
    // if (!Id) {
    //   return res.status(404).send({ status: false, message: "no such blogs exists" });
    // }

    let RemovedBlogs = await BlogsModel.findOneAndUpdate(
      { _id: blogId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true }
    );

    if (!RemovedBlogs) {
      res.status(404).send({ status: false, msg: "document not found or already deleted" })
    }
    res.status(200).send({ status: true, data: RemovedBlogs })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error })
  }
};

//=====================================================deletebyquery======================================//
const deleteByquery = async function (req, res) {
  try {
    let data = req.query;
    let { authorId, tags, category, subcategory, isPublished } = data

    if (Object.keys(data).length == 0) {
      return res.status(403).send({ status: false, msg: "query must be present" });
    }

    let Obj = { isDeleted: false }

    if (authorId) {
      Obj.authorId = authorId
    }
    if (category) {
      Obj.category = category
    }
    if (tags) {
      Obj.tags = tags
    }
    if (subcategory) {
      Obj.subcategory = subcategory
    }
    if (isPublished) {
      Obj.isPublished = isPublished
    }

    let blogDoc = await BlogsModel.findOneAndUpdate(Obj, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });

    if (!blogDoc) {
      return res.status(404).send({ status: false, msg: "blogdoc are not found" })
    }
    else {
      res.status(200).send({ status: true, data: blogDoc })
    }
  }
  catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
};

module.exports = { getBlog, updateBlog, createBlog, deleteBlogs, deleteByquery };