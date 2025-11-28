import Task from '../models/Task.model.js';

const createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        if (!title || !description) throw new Error('All Fields are required');

        const task = new Task({ title, description, pending: 'Pending' });
        await task.save();

        res.status(201).json({ success: true, message: "Task Created Successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const fetchAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        if (tasks) {
            res.status(200).json({ success: true, tasks });
        } else {
            res.status(404).json({ success: false, message: "No Tasks Found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export { createTask, fetchAllTasks };

