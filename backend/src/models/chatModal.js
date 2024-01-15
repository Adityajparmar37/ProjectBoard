const mongoose = require('mongoose');

const ChatGroupSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        name: String,
    }],

});

const ChatGroup = mongoose.model('chatGroup', ChatGroupSchema);

module.exports = ChatGroup;
