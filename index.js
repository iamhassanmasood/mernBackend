const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const Todo = require('./schema');
const ToDoRoutes = express.Router();
const connection = mongoose.connection;
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });

connection.once("open", function () {
    console.log("mongodb database connected");
});

ToDoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log("error", error);
        }
        else {
            res.json(todos);
        }
    });
});

ToDoRoutes.route('/:id').get(function (req, res) {
    const id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});

ToDoRoutes.route('/add').post(function (req, res) {
    const todo = new Todo(req.body);
    todo.save().then(todo => {
        res.status(200).json({ 'todo': 'todo added successfully' })
    })
        .catch(err => {
            res.status(400).send('New todo added failed')
        })

});

ToDoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if(!todo)
            res.status(404).send('data is not available');
        else
            todos.todoDescription = req.body.todoDescription;
            todos.todoResponsible = req.body.todoResponsible;
            todos.todoPriority = req.body.todoPriority;
            todos.todoCompleted = req.body.todoCompleted;        
        todos.save().then(todo => {
            res.json('Todo Updated');
        })
        .catch(err=>{
            res.status(400).send("Update Not Possible")
        })
    });
});

app.use('/todos', ToDoRoutes);
app.listen(PORT);