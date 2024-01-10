const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
    projectName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    },
    files: [{
        type: String,
    }],
})

const Files = mongoose.model('files', filesSchema);

module.exports = Files;