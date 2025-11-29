// Implementing bulk task assignment functionality

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/**
 * @route POST /api/tasks/bulk/assign
 * @desc Assign tasks in bulk
 * @access Public
 */
router.post('/bulk/assign', async (req, res) => {
    const { taskIds, assigneeId } = req.body;

    if (!taskIds || !assigneeId) {
        return res.status(400).json({ message: 'Please provide task IDs and assignee ID.' });
    }

    try {
        const tasks = await Task.updateMany({ _id: { $in: taskIds } }, { $set: { assignee: assigneeId } });
        res.status(200).json({ message: `${tasks.nModified} tasks have been assigned to user ${assigneeId}.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;