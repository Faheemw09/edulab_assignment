const express = require("express");
const { Task } = require("../Model/TaskModel");
const { auth } = require("../Middleware/AuthMiddleware");
const taskRouter = express.Router();

taskRouter.post("/create", async (req, res) => {
  const { title, description, priority, status, assignedTo, dueDate } =
    req.body;

  try {
    let tasks = new Task({
      title,
      description,
      priority,
      status,
      assignedTo,
      dueDate,
    });
    await tasks.save();
    console.log(tasks);
    res.status(200).json({
      message: "Task created sucessfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

taskRouter.get("/get", auth, async (req, res) => {
  try {
    const isAdmin = req.userRole === "admin";
    let tasks;
    console.log(req.userId);
    if (isAdmin) {
      tasks = await Task.find({});
    } else {
      tasks = await Task.find({ assignedTo: req.userId });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
taskRouter.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const tasks = await Task.findById(id);
  try {
    const isAdmin = req.userRole === "admin";
    if (!tasks) {
      return res.status(400).json({
        message: "Task Not Found",
      });
    }
    console.log(req.userId, tasks.assignedTo);
    if (tasks.assignedTo.toString() !== req.userId && !isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to update this task",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Task has been updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
});
taskRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  const tasks = await Task.findById(id);

  try {
    const isAdmin = req.userRole === "admin";
    if (!tasks) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    if (tasks.assignedTo.toString() !== req.userId && !isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to update this task",
      });
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json({
      message: "Task has been Deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
});
module.exports = {
  taskRouter,
};
