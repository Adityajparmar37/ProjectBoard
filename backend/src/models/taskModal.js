const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {

        taskCreator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },

        taskType: {
            type: String,
            required: true
        },

        taskProject: {
            type: String
        },

        taskTitle: {
            type: String,
            required: true
        },

        taskDescription: {
            type: String,
            required: true
        },

        taskPriority: {
            type: String,
            required: true
        },

        isCrossed: {
            type: Boolean, 
            default: false
        },

        taskMembers: {
            type: [{
                memberName: {
                    type: String,
                },
                memberId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Student', 
                },
            }],
        },
        taskStartDate: {
            type: Date,
            default: Date.now,
        },
        taskEndDate: {
            type: Date,
            validate: {
                validator: function (endDate) {
                    return this.taskStartDate <= endDate;
                },
                message: 'End date must be equal to or after the start date.',
            },
        },
    },
    {
        timestamps: true
    }
);


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

