const Blog = require("../models/blogModel");
const mongoose = require('mongoose');
const {uploadOnCloudnary} = require('../services/cloudinary');

const allBlogs = async(req, res) => {
    try {
        const blog = await Blog.find({}).sort({ createdBy: -1 });
        return res.status(200).json(blog);
   
    } catch (err) {
        res.status(500).json("Internal sever error!");
        console.log(err);
        
    }
}


const addBlogs = async(req, res) => {
try {
    const {title, body, coverImage } = req.body;
    const myCloud = await uploadOnCloudnary(req.body.coverImage);


    if(!title || !body ) 
        res.status(403).json("ALL FEILDS ARE REQUIRED!");

    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImage:myCloud.secure_url,
    })

    console.log(`Blog created: ${JSON.stringify(blog)}`);  // Debugging statement

    return res.status(201).json( blog);
   
} catch (err) {
    res.status(500).json("Internal sever error!");
        console.log(err);
        
}
}

const viewMoreAboutBlog = async (req, res) => {
    try {
        // Validate the blog ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json("Invalid blog ID format!");
        }

        // Find the blog by ID
        const blog = await Blog.findById(req.params.id);

        // If the blog is not found, return a 404 status code
        if (!blog) {
            return res.status(404).json("Blog not found!");
        }

        // Return the blog with a 200 status code
        return res.status(200).json( blog );
    
    } catch (err) {
        // Log the error and return a 500 status code
        console.error("Error in viewMoreAboutBlog:", err.message);
        return res.status(500).json("Internal server error!");
    }
}

module.exports = { allBlogs, addBlogs, viewMoreAboutBlog };
