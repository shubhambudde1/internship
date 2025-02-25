import React, { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './TaskService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending', due_date: '' });
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await getTasks();
        setTasks(response.data);
    };

    const handleAddTask = async () => {
        const response = await addTask(newTask);
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '', status: 'Pending', due_date: '' });
    };

    const handleUpdateTask = async (id) => {
        const response = await updateTask(id, editingTask);
        setTasks(tasks.map(task => (task.id === id ? response.data : task)));
        setEditingTask(null);
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div>
            <h1>Task Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{editingTask?.id === task.id ? <input value={editingTask.title} onChange={e => setEditingTask({ ...editingTask, title: e.target.value })} /> : task.title}</td>
                            <td>{editingTask?.id === task.id ? <input value={editingTask.description} onChange={e => setEditingTask({ ...editingTask, description: e.target.value })} /> : task.description}</td>
                            <td>
                                {editingTask?.id === task.id ? (
                                    <select value={editingTask.status} onChange={e => setEditingTask({ ...editingTask, status: e.target.value })}>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                ) : (
                                    task.status
                                )}
                            </td>
                            <td>{editingTask?.id === task.id ? <input type="date" value={editingTask.due_date} onChange={e => setEditingTask({ ...editingTask, due_date: e.target.value })} /> : task.due_date}</td>
                            <td>
                                {editingTask?.id === task.id ? (
                                    <button onClick={() => handleUpdateTask(task.id)}>Save</button>
                                ) : (
                                    <button onClick={() => setEditingTask(task)}>Edit</button>
                                )}
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Add New Task</h2>
            <input placeholder="Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
            <input placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
            <select value={newTask.status} onChange={e => setNewTask({ ...newTask, status: e.target.value })}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <input type="date" value={newTask.due_date} onChange={e => setNewTask({ ...newTask, due_date: e.target.value })} />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
};

export default TaskList;
