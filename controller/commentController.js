const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

const addComment = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid blog ID format!" });
      }

    // Check if the comment text is provided
    if (!req.body.text) {
      return res.status(400).json({ msg: "Comment text is required." });
    }

    const comment = new Comment({
      text: req.body.text,
      post: id,
    });

    await comment.save();

    const postRelated = await Blog.findById(id);
    if (!postRelated) {
      return res.status(404).json("Blog not found!");
    }

    postRelated.comments.push(comment);
    await postRelated.save();

    return res.status(201).json({ msg: "Comment added successfully!"});
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error!");
  }
};

const showComment = async (req, res) => {
  try {
    // Validate if the comment ID is a valid ObjectId
    const commentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ msg: "Invalid comment ID format!" });
    }

    // Find the comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found!" });
    }

    return res.status(200).json({ msg: "Comment found!", comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};


module.exports = { addComment, showComment };
