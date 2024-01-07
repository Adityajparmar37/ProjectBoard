const express = require('express');
const router = express.Router();
const handler = require('express-async-handler');
const authMid = require('../middlewares/authMiddleware.js');
const errorHandler = require('../middlewares/errorMiddlewares');
const Task = require('../models/taskModal.js');


//middleare for authorization
router.use(authMid);


//user nae badhe task 
router.get("/manageTask", handler(async (req, res, next) => {
    try {
        const queryObject = { taskCreator: req.user.id };

        let taskList = await Task.find(queryObject);

        if (taskList.length > 0) {
            res.json(taskList);
        } else {
            res.json({ message: "No task found for the user" });
        }
    } catch (error) {
        console.error('Error fetching task: ', error);
        next(error);
    }
}));


//task creation
router.post("/createTask", handler(async (req, res, next) => {
    try {
        const {
            taskType,
            taskProject,
            taskTitle,
            taskDescription,
            taskPriority,
            taskMembers,
            startDate,
            endDate,
        } = req.body;

        if (!taskType ||
            !taskTitle ||
            !taskDescription ||
            !taskPriority) {
            return next(errorHandler(400, "Please fill all fields"));
        }

        const task = await Task.create({
            taskCreator: req.user.id,
            taskType,
            taskProject,
            taskTitle,
            taskDescription,
            taskPriority,
            taskMembers,
            taskStartDate: startDate,
            taskEndDate: endDate,
            success: true
        });

        if (task) {
            return res.status(201).json({ message: "Task created successfully" });
        } else {
            return next(errorHandler(500, "Something went wrong!"));
        }
    } catch (error) {
        next(error);
    }
}));



module.exports = router;