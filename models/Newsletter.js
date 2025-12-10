const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for backward compatibility
newsletterSchema.virtual('subscribed_at').get(function () {
    return this.subscribedAt;
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
