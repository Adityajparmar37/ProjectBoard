const express = require('express');
const router = express.Router();
const handler = require('express-async-handler');
const authMid = require('../middlewares/authMiddleware.js');
const errorHandler = require('../middlewares/errorMiddlewares');
const Project = require('../models/projectModal.js');

//middleare for authorization
router.use(authMid);


router.get("/manageProject", handler(async (req, res, next) => {
    try {
        const projects = await Project.find({ projectCreator: req.user.id });

        if (projects.length > 0) {
            res.json(projects);
        } else {
            res.status(404).json({ message: 'No projects found for the user' });
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));

router.post("/createProject", handler(async (req, res, next) => {

    try {

        const { projectTitle, projectObjectives, projectDescription, projectStatus, projectCategory, startDate, endDate, projectMembers, projectPhases } = req.body;


        if (!projectTitle || !projectObjectives || !projectDescription || !projectStatus || !projectCategory || !startDate || !endDate || !projectPhases) {
            next(errorHandler(404, "Please fill all fields"));
        }

        const project = await Project.create({
            projectCreator: req.user.id,
            projectTitle,
            projectObjectives,
            projectDescription,
            projectStatus,
            projectCategory,
            projectStartDate: startDate,
            projectEndDate: endDate,
            projectMembers,
            projectPhases,
            success: true
        });


        if (project) {
            res.status(201).send({ message: "Project created successfully" });
        } else {
            next(errorHandler(400, "Something went Wrong !"));
        }
    } catch (error) {
        next(error);
    }
}))

module.exports = router;