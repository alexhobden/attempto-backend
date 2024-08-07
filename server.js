const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1/attempto');

const TaskSchema = new mongoose.Schema({
    id: Number,
    name: String,
});

const Task = mongoose.model('Task', TaskSchema);

//Routes
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) =>{
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.sendStatus(204);
});

app.listen(5000, () =>{
    console.log('Server is running on port 5000');
});