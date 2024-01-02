const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
)


const Friend = mongoose.model('friend', friendSchema);

module.exports = Friend;