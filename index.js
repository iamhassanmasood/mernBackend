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

