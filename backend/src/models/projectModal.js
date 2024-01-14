const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        projectCreator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },
        projectTitle: {
            type: String,
            required: true,
        },
        projectObjectives: {
            type: String,
            required: true,
        },
        projectDescription: {
            type: String,
            required: true,
        },
        projectStatus: {
            type: String,
            required: true,
        },
        projectCategory: {
            type: String,
            required: true,
        },
        projectStartDate: {
            type: Date,
            default: Date.now,
        },
        projectEndDate: {
            type: Date,
            validate: {
                validator: function (endDate) {
                    return this.projectStartDate <= endDate;
                },
                message: 'End date must be equal to or after the start date.',
            },
        },
        projectMembers: {
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
        projectPhases: {
            type: [{
                phaseTitle: {
                    type: String,
                    required: true,
                },
                phaseNum: {
                    type: String,
                    required: true,
                },
            }],
            validate: {
                validator: function (phases) {
                    return phases.length > 0;
                },
                message: 'At least one phase is required.',
            },
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
