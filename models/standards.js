const mongoose = require("mongoose");

const StandardSchema = new mongoose.Schema({
    text:{
        type : String,
        required : true
    },
    value:{
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
const Standard = mongoose.model("Standard", StandardSchema);
module.exports = Standard;