const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    choix: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    }
});

module.exports = mongoose.model('user', PostSchema);
