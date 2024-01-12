const express = require('express');
const router = express.Router();
const handler = require('express-async-handler');
const authMid = require('../middlewares/authMiddleware.js');
const errorHandler = require('../middlewares/errorMiddlewares.js');
const Project = require('../models/projectModal.js');

//middleare for authorization
router.use(authMid);


router.get("/manageProject", handler(async (req, res, next) => {
    try {
        const { Page, pageSize, ...Filters } = req.query;

        const { keywordSearch, title, category, status, sort } = Filters;

        console.log("Filters backend==> ", Filters);
        console.log("Page backend==> ", Page, " ", pageSize);

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
            .sort({ createdAt: sort === 'new' ? -1 : 1 })

        if (keywordSearch) {
            const keywordSearchRegex = new RegExp(keywordSearch, 'i');


            //some callback func che etla jo agar element match thai jai toh true nakar false
            filterprojects = filterprojects.filter((project) => (
                (project.projectTitle && project.projectTitle.match(keywordSearchRegex)) ||
                (project.projectObjectives && project.projectObjectives.match(keywordSearchRegex)) ||
                (project.projectDescription && project.projectDescription.match(keywordSearchRegex)) ||
                (project.projectStatus && project.projectStatus.match(keywordSearchRegex)) ||
                (project.projectCategory && project.projectCategory.match(keywordSearchRegex)) ||
                (project.projectMembers && project.projectMembers.some((member) => member.memberNam && member.memberNam.match(keywordSearchRegex))) ||
                (project.projectPhases && project.projectPhases.some((phase) => (phase.phaseTitle && phase.phaseTitle.match(keywordSearchRegex)) || (phase.phaseNum && phase.phaseNum.match(keywordSearchRegex))))
            ));
        }



        const currentPage = Number(Page) || 1;
        const limit = Number(pageSize) || 6;
        const startindex = (currentPage - 1) * limit;
        const endIndex = currentPage * limit;

        const paginatedProjects = filterprojects.slice(startindex, endIndex);
        console.log("Backend search and sort: ", filterprojects);

        if (paginatedProjects.length > 0) {
            res.json(paginatedProjects);
        } else {
            res.json({ message: 'No projects found for the user' });
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


router.get("/manageProject/:id", handler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const projectData = await Project.findById(id);
        res.send(projectData);
    } catch (error) {
        next(errorHandler(404, "No Such Project Found"));
    }
}))


router.put("/manageProject/update/:id", handler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFormData = req.body;
        const updatedProject = await Project.findByIdAndUpdate(id, updateFormData, { update: true });

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));


router.delete("/manageProject/delete/:id", handler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const projectToDelete = await Project.findByIdAndDelete(id);

        if (!projectToDelete) {
            return next(errorHandler(404, "Project not found"));
        }

        res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        next(error);
    }
}));

module.exports = router;