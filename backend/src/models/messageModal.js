const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (if you have a User model)
        required: true,
    },
    senderName: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatGroup', // Reference to the ChatGroup model
        required: true,
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
