const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: String,
    link: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for backward compatibility
projectSchema.virtual('image_url').get(function () {
    return this.imageUrl;
});

projectSchema.virtual('created_at').get(function () {
    return this.createdAt;
});

module.exports = mongoose.model('Project', projectSchema);
