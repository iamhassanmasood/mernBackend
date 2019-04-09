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

