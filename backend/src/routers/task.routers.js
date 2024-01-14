const express = require('express');
const router = express.Router();
const handler = require('express-async-handler');
const authMid = require('../middlewares/authMiddleware.js');
const errorHandler = require('../middlewares/errorMiddlewares');
const Project = require('../models/projectModal.js');
const Student = require('../models/studentModal.js');
const Task = require('../models/taskModal.js');


//middleare for authorization
router.use(authMid);


//user nae badhe task 
router.get("/manageTask", handler(async (req, res, next) => {
    try {

        const { ...filterTask } = req.query;

        const { keywordSearch, taskType, taskPriority, sort } = filterTask;

        console.log("Task filters ==> ", filterTask);
        console.log(sort)

        const queryObject = { taskCreator: req.user.id };

        if (taskType) {
            queryObject.taskType = { $regex: new RegExp(taskType, 'i') };
        }

        if (taskPriority) {
            queryObject.taskPriority = { $regex: new RegExp(taskPriority, 'i') };
        }

        let filteredTask = await Task
            .find(queryObject)
            .sort({ createdAt: sort === 'new' ? -1 : 1 })


        if (keywordSearch) {
            const keywordSearchRegex = new RegExp(keywordSearch, 'i');

            filteredTask = filteredTask.filter((task) => (
                (task.taskTitle && task.taskTitle.match(keywordSearchRegex)) ||
                (task.taskType && task.taskType.match(keywordSearchRegex)) ||
                (task.taskTitle && task.taskTitle.match(keywordSearchRegex)) ||
                (task.taskDescription && task.taskDescription.match(keywordSearchRegex)) ||
                (task.taskPriority && task.taskPriority.match(keywordSearchRegex)) ||
                (task.taskMembers && task.taskMembers.some((member) => member.memberNam && member.memberNam.match(keywordSearchRegex)))
            ));
        }

        console.log(filteredTask)

        if (filteredTask.length > 0) {
            res.json(filteredTask);
        } else {
            res.json({ message: "No task found for the user" });
        }
    } catch (error) {
        console.error('Error fetching task: ', error);
        next(error);
    }
}));


router.get("/taskALLProject", handler(async (req, res, next) => {
    try {
        let Allproject = await Project.find({ projectCreator: req.user.id });

        if (Allproject.length > 0) {
            res.json(Allproject);
        } else {
            res.json({ message: "No Project Found for user" });
        }
    } catch (error) {
        console.log('Error fetching project (task): ', error);
        next(error);
    }
}))

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


router.put("/manageTask/update/:id", handler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFormData = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, updateFormData, { update: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
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

        // console.log(projectMembers)
        const taskMembersData = [];
        for (const memberData of taskMembers) {
            const student = await Student.findOne({ name: memberData.memberNam });
            if (student) {
                taskMembersData.push({
                    memberId: student.id,
                    memberName: student.name,
                });
            } else {

                return res.status(404).json({ error: `Student with name ${memberData.memberName} not found` });
            }
        }

        const task = await Task.create({
            taskCreator: req.user.id,
            taskType,
            taskProject,
            taskTitle,
            taskDescription,
            taskPriority,
            taskMembers: taskMembersData,
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