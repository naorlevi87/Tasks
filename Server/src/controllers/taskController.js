import  Task  from "../models/TaskModel.js";

const getAllTasks = async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
}

const createNewTask = async (req, res) => {
    if(!req.body.title)
    {
        res.status(400).send("Title is required");
    }
    //console.log(req.body.title);
    // if(!req.body.creatorUserId){
    //     res.status(400).send("CreatorUserId is required");
    // }
    //console.log(req.body.creatorUserId);
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            creationDate: req.body.creationDate,
            creatorUserId: req.body.creatorUserId,
            assinedToID: req.body.assinedToID,
            taskProgress: req.body.taskProgress
        });
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).send("Task creation failed");
        console.log(error);
    }


}

const updateTaskById = async (req, res) => {
    const { id } = req.params;
    // Find the task by its ID
    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).send("Task not found" );
    }
    try {
        // Update task fields with data from the request
        if (req.body.title) {
            task.title = req.body.title;
        }
        if (req.body.description) {
            task.description = req.body.description;
        }
        if (req.body.assinedToID) {
            task.assinedToID = req.body.assinedToID;
        }
        if (req.body.taskProgress) {
            task.taskProgress = req.body.taskProgress;
        }

        // Save the updated task
        await task.save();

        res.status(200).send(task);
    } catch (error) {
        res.status(500).send("Internal server error" );
        console.los(error);
    }
}

const deleteTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the task by its ID
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).send("Task not found" );
        }
        // Delete the task
        const taskTitle = task.title;
        await task.deleteOne();
        res.status(200).send("task "+taskTitle+" deleted successfully");
    }   catch (err) {
        res.status(500).send("Internal server error" );
        console.log(err);
    }   
};


export const taskController = {
    getAllTasks,
    createNewTask,
    updateTaskById,
    deleteTaskById
}
