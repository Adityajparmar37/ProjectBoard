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

//get the task from database
router.get("/manageTask/:id", handler(async (req, res, next) => {
    try {
        const { id } = req.params;

        let task = await Task.findById(id);

        if (task) {
            res.json(task);
        } else {
            res.json({ message: "No task found" });
        }
    } catch (error) {
        console.error('Error fetching task: ', error);
        next(error);
    }
}));


//task done
router.get("/manageTask/taskdone/:id", handler(async (req, res, next) => {
    try {
        const { id } = req.params;

        let task = await Task.findByIdAndUpdate(
            id,
            { $set: { isCrossed: true } }
        );

        if (task) {
            res.json({ message: "Task Done" });
        } else {
            res.json({ message: "Please try again !" });
        }
    } catch (error) {
        console.erro('Error in crossing task: ', error);
        next(error);
    }
}));

//task Undo
router.get("/manageTask/taskUndo/:id", handler(async (req, res, next) => {
    try {
        const { id } = req.params;

        let task = await Task.findByIdAndUpdate(
            id,
            { $set: { isCrossed: false } }
        );

        if (task) {
            res.json({ message: "Task Done" });
        } else {
            res.json({ message: "Please try again !" });
        }
    } catch (error) {
        console.erro('Error in crossing task: ', error);
        next(error);
    }
}));


router.delete("/manageTask/delete/:id", handler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const taskToDelete = await Task.findByIdAndDelete(id);

        if (!taskToDelete) {
            return next(errorHandler(404, "Task not found"));
        }

        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
}))

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