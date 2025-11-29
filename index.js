// Update the /api/tasks/bulk/delete route to implement bulk task deletion functionality
const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Assuming you have a Task model

// Bulk delete route
router.delete('/bulk/delete', async (req, res) => {
    const { taskIds } = req.body;
    if (!Array.isArray(taskIds)) {
        return res.status(400).json({ message: 'taskIds must be an array' });
    }

    try {
        const result = await Task.deleteMany({ _id: { $in: taskIds } });
        console.log(`Deleted tasks: ${taskIds.join(', ')}`); // Logging the deleted task IDs
        return res.status(200).json({ message: `Deleted ${result.deletedCount} tasks`, taskIds });
    } catch (error) {
        console.error('Error deleting tasks:', error);
        return res.status(500).json({ message: 'Error deleting tasks' });
    }
});

module.exports = router;