const BlogsModel = require("../Models/BlogsModel")
const AuthorModel = require("../Models/AuthorModel")
const mongoose = require("mongoose")

//==================================================createBlog==========================================//

const createBlog = async function(req, res){

    try{let data = req.body
    let { title, body, authorId, tags,category} = data

    if (!title) { return res.status(400).send({ status: false, msg: "please provide the title" })}

    if (!body) { return res.status(400).send({ status: false, msg: "please provide the body" })}

    if (!authorId) { return res.status(400).send({ status: false, msg: "please provide the authorId"})}

    if (!tags) { return res.status(400).send({ status: false, msg: "please provide the tags" })}

    if (!category) { return res.status(400).send({ status: false, msg: "please provide the category" })}

    let author = await AuthorModel.findOne({ authorId: authorId })

    if (!author) { return res.status(400).send({ status: false, msg: "this authorId is not valid " })}


    let savedata = await BlogsModel.create(data)

    res.status(201).send({status : true, msg: savedata})}
    catch(error){
        res.status(500).send({ status: false, msg: error.message })
    }
}
//=================================================getblog==================================================//
const getBlog = async function (req, res) {
    try {
        let data = req.query
        let { authorId, tags, category, subcategory } = data;

        if (Object.keys(data) == 0)
         {
            let blogs = await BlogsModel.find({ $and: [ {isDeleted: false ,  isPublished: true}]})
            if (blogs.length==0) return res.status(404).send({ status: false, msg: "No documents are found" })
            return res.status(200).send(blogs);
         }

        
        let Obj = {}
        let Objectid = mongoose.Types.ObjectId(authorId)
        if (!Objectid) {
            return res.status(400).send({ status: false, msg: "invalid authorid" })
        }
       if(authorId) {Obj.authorId = authorId}

        if (category) { Obj.category = category; }
        if (tags) { Obj.tags = tags; }
        if (subcategory) { Obj.subcategory = subcategory }
    
        let blogDoc = await BlogsModel.find(Obj)
        if (blogDoc.length ==0) return res.status(404).send({ status: false, msg: "blogdoc are not found" })

        res.status(200).send({ status: true, data: blogDoc })

    } catch (err) {
        res.status(500).send({ status:false, error: err.message })
    }
};
    //=================================================putblog==========================================//

    const putBlog = async function(req, res){

      try { let blogId = req.params.blogId

                 let data = req.body

              const {title,body, tags,subcategory}=data

        let value = await BlogsModel.findOne({_id:blogId})

        if(!value) { return res.status(404).send({ status: false, msg: "blogid not exist" })}
           
        let dataBlog = await BlogsModel.findOneAndUpdate(
               { _id: blogId },
             {
                   $set: { title: title, body: body, isPublished: true, publishedAt: Date.now() },
                   $push: {tags: tags, subcategory: subcategory }
           
             }, { new: true })
        if (!dataBlog) return res.status(404).send({ status: false, msg: "dataBlog is not exist" })

           res.status(200).send({ status: true, msg: "Document Updated Successfully", data: dataBlog })
      }
       catch(error){  res.status(500).send({status:false, msg:error})}
}

 //======================================================deletedblog==================================//
 
 const deletBlogs = async function(req, res) { 

    let blogId = req.params.blogId

    let user = await BlogsModel.findById({blogId})
    if(!user) {
        return res.status(404).send({status: false, message: "no such blogs exists"})
    }
    
    let updateBlogs = await BlogsModel.findOneAndUpdate({_id: blogId, isDeleted:false}, {isDeleted: true}, {new: true})

    
    res.status(200).send({status: true, data: updateBlogs})

  }

  //=====================================================deletebyquery======================================//
  const deletyqury = async function (req, res) {
    try {
        let data = req.query
        let { authorId, tags, category, subcategory, isPublished} = data;

        // if (Object.keys(data) == 0)
         
        let Obj = {}
        let Objectid = mongoose.Types.ObjectId(authorId)
        if (!Objectid) {
            return res.status(400).send({ status: false, msg: "invalid authorid" })
        }
       if(authorId) {Obj.authorId = authorId}

        if (category) { Obj.category = category; }
        if (tags) { Obj.tags = tags; }
        if (subcategory) { Obj.subcategory = subcategory }
        if (isPublished) { Obj.isPublished = isPublished }
    
        let blogDoc = await BlogsModel.find(Obj).findOneAndUpdate({isDeleted:false},{isDeleted:true},{new:true})

        if (!blogDoc) return res.status(404).send({ status: false, msg: "blogdoc are not found" })
         
        res.status(200).send({ status: true, data: blogDoc })

    } catch (err) {
        res.status(500).send({ status:false, error: err.message })
    }
};

module.exports.getBlog = getBlog;
module.exports.putBlog = putBlog;
module.exports.createBlog=createBlog
module.exports.deletBlogs=deletBlogs
module.exports.deletyqury=deletyqury

