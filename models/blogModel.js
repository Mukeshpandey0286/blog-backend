const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
        required: false,
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "blogUsers",
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
          }]
})

module.exports = mongoose.model("blogs" ,blogSchema);