const Blog = require("../models/blogModel");
const mongoose = require('mongoose');

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
    const {title, body,} = req.body;

    if(!title || !body ) 
        res.status(403).json("ALL FEILDS ARE REQUIRED!");

    if (!req.user || !req.user._id) {
        return res.status(401).json("User not authenticated!");
    }

    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id
    })

    console.log(`Blog created: ${JSON.stringify(blog)}`);  // Debugging statement

    return res.status(201).json({ msg: "Blog is created successfully!!", blog});
   
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
        return res.status(200).json({ msg: "Blog is successfully fetched!", blog });
    
    } catch (err) {
        // Log the error and return a 500 status code
        console.error("Error in viewMoreAboutBlog:", err.message);
        return res.status(500).json("Internal server error!");
    }
}

module.exports = { allBlogs, addBlogs, viewMoreAboutBlog };
