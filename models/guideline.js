const mongoose = require("mongoose");

const GuidelineSchema = new mongoose.Schema({
    text:{
        type : String,
        required : true
    },
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
    source: {
        type: String,
        default: "",
    }
});
const Guideline = mongoose.model("Guideline", GuidelineSchema);
module.exports = Guideline;