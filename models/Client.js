const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: String,
    description: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals for backward compatibility
clientSchema.virtual('designation').get(function () {
    return this.role;
});

clientSchema.virtual('image_path').get(function () {
    return this.imageUrl;
});

clientSchema.virtual('created_at').get(function () {
    return this.createdAt;
});

module.exports = mongoose.model('Client', clientSchema);
