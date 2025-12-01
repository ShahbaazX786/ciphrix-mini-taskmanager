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

const updateTask = async (req, res) => {
    const id = req.params.id;
    const { title, description, status } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true, runValidators: true });
        if (updatedTask) {
            res.status(200).json({ success: true, message: "Task Updated Successfully" });
        } else {
            res.status(404).json({ success: false, message: "Task Not Found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (deletedTask) {
            res.status(200).json({ success: true, message: "Task Deleted Successfully" });
        } else {
            res.status(404).json({ success: false, message: "Task Not Found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        if (task) {
            res.status(200).json({ success: true, task });
        } else {
            res.status(404).json({ success: false, message: "Task Not Found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const fetchAllTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            res.status(400).json({ success: false, message: 'Invalid query please enter a valid range' });
        }

        const skip = (page - 1) * limit;

        const [total, taskList] = await Promise.all([
            Task.countDocuments(),
            Task.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit)
        ]);

        if (total && taskList) {
            const totalPages = Math.ceil(total / limit);
            const hasNext = skip + taskList.length < total;
            res.status(200).json({ success: true, page, limit, total, totalPages, hasNext, taskList });
        } else {
            res.status(200).json({ success: true, message: "No Tasks Found", taskList: [] });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export { createTask, deleteTask, fetchAllTasks, getTask, updateTask };

