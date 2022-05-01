const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    guidelines: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Guideline"
        }
    ],
    standards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Standard"
        }
    ],
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    authorName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports=mongoose.model("Page", PageSchema);