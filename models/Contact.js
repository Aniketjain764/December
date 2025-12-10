const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: String,
    city: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals for backward compatibility
contactSchema.virtual('name').get(function () {
    return this.fullname;
});

contactSchema.virtual('submitted_at').get(function () {
    return this.createdAt;
});

module.exports = mongoose.model('Contact', contactSchema);
