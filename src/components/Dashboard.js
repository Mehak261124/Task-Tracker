import React, { useState, useEffect } from "react";
import { TfiTimer } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "./navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    assignee: "",
    dueDate: "",
  });
  const [filter, setFilter] = useState("");
  const [editTask, setEditTask] = useState(null);

  // Check for login status
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    if (!isAuthenticated) {
      navigate("/signup");
    }
  }, [navigate]);

  // Add a new task
  const handleAddTask = () => {
    if (!newTask.title || !newTask.priority || !newTask.status) {
      alert("Please fill all required fields (Title, Priority, and Status).");
      return;
    }

    const updatedTasks = [
      ...tasks,
      { ...newTask, id: Date.now(), timeSpent: 0 },
    ];
    setTasks(updatedTasks);
    setNewTask({
      title: "",
      description: "",
      priority: "",
      status: "",
      assignee: "",
      dueDate: "",
    });
    alert("Task added successfully!");
  };

  // Update the task
  const handleUpdateTask = () => {
    if (!editTask.title || !editTask.priority || !editTask.status) {
      alert("Please fill all required fields (Title, Priority, and Status).");
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id ? editTask : task
    );
    setTasks(updatedTasks);
    setEditTask(null);
    document.querySelector(".dashboard").classList.remove("blurred");
    alert("Task updated successfully!");
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    alert("Task deleted successfully!");
  };

  // Filter tasks
  const filteredTasks = tasks.filter(
    (task) => !filter || task.priority === filter || task.status === filter
  );

  const handleEditClick = (task) => {
    setEditTask(task);
    document.querySelector(".dashboard").classList.add("blurred");
  };

  const calculateTimeLeft = (dueDate) => {
    const currentDate = new Date();
    const targetDate = new Date(dueDate);
    if (!dueDate || targetDate < currentDate) {
      return "Past Due";
    }

    const difference = targetDate - currentDate;
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return `${daysLeft} day${daysLeft > 1 ? "s" : ""} remaining`;
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Task/Bug Tracker</h1>

        {/* Task Creation */}
        <div className="task-creation">
          <h2>Create Task/Bug</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <option value="" disabled>
              Select Priority
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <input
            type="text"
            placeholder="Assignee"
            value={newTask.assignee}
            onChange={(e) =>
              setNewTask({ ...newTask, assignee: e.target.value })
            }
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        {/* Task Management */}
        <div className="task-management">
          <h2>Manage Tasks</h2>
          <select onChange={(e) => setFilter(e.target.value)} defaultValue="">
            <option value="" disabled>
              Filter Tasks By...
            </option>
            <option value="">All Tasks</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          <ul className="task-list">
            {filteredTasks.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-details">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>
                    <strong>Priority:</strong> {task.priority} |{" "}
                    <strong>Status:</strong> {task.status}
                  </p>
                  <p>
                    <strong>Assignee:</strong> {task.assignee} |{" "}
                    <strong>Due Date:</strong> {task.dueDate || "Not Set"}
                  </p>
                </div>
                <div className="task-timer">
                  <TfiTimer className="timer-icon" />
                  <div className="time-left-box">
                    {calculateTimeLeft(task.dueDate)}
                  </div>
                </div>
                <div className="task-actions">
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit Task Modal */}
      {editTask && (
        <div className="modal-background">
          <div className="edit-modal">
            <h2>Edit Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
            />
            <select
              value={editTask.priority}
              onChange={(e) =>
                setEditTask({ ...editTask, priority: e.target.value })
              }
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select
              value={editTask.status}
              onChange={(e) =>
                setEditTask({ ...editTask, status: e.target.value })
              }
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            <input
              type="text"
              placeholder="Assignee"
              value={editTask.assignee}
              onChange={(e) =>
                setEditTask({ ...editTask, assignee: e.target.value })
              }
            />
            <input
              type="date"
              value={editTask.dueDate}
              onChange={(e) =>
                setEditTask({ ...editTask, dueDate: e.target.value })
              }
            />
            <button onClick={handleUpdateTask}>Update Task</button>
            <button onClick={() => setEditTask(null)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;


