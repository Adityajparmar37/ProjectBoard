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
        const { ...Filters } = req.query;

        const { keywordSearch, title, category, status, sort } = Filters;

        console.log("Filters backend==> ", Filters);

        //student nae badha project find karo
        const queryObject = { projectCreator: req.user.id };


        //regex mongoDB
        if (title) {
            queryObject.projectTitle = { $regex: new RegExp(title, 'i') };
        }

        if (category) {
            queryObject.projectCategory = { $regex: new RegExp(category, 'i') };
        }

        if (status) {
            queryObject.projectStatus = { $regex: new RegExp(status, 'i') };
        }

        console.log("projectCreator ==> ", queryObject)

        let filterprojects = await Project
            .find(queryObject)
            .sort({ createdAt: sort === 'new' ? -1 : 1 });

        if (keywordSearch) {
            const keywordSearchRegex = new RegExp(keywordSearch, 'i');


            //some callback func che etla jo agar element match thai jai toh true nakar false
            filterprojects = filterprojects.filter((project) => (
                project.projectTitle.match(keywordSearchRegex) ||
                project.projectObjectives.match(keywordSearchRegex) ||
                project.projectDescription.match(keywordSearchRegex) ||
                project.projectStatus.match(keywordSearchRegex) ||
                project.projectCategory.match(keywordSearchRegex) ||
                project.projectMembers.some((member) => member.memberNam.match(keywordSearchRegex)) ||
                project.projectPhases.some((phase) => phase.phaseTitle.match(keywordSearchRegex) || phase.phaseNum.match(keywordSearchRegex))
            ));
        }

        if (filterprojects.length > 0) {
            res.json(filterprojects);
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