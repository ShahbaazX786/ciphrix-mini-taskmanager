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

export { createTask };