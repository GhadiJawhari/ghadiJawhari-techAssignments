const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    tags: [String],
    published: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Tutorial', tutorialSchema);

