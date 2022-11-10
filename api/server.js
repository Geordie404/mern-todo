const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


// Set up mongo atlas URI to be used with mongoose
const mongoAtlasUri = 
    "mongodb+srv://geordie:FZIxN3h4C3pgoxbP@cluster0.canbqbb.mongodb.net/?retryWrites=true&w=majority";

    try {
        // Connect to the MongoDB cluster
         mongoose.connect(
          mongoAtlasUri,
          { useNewUrlParser: true, useUnifiedTopology: true },
          () => console.log(" Mongoose is connected")
        );
    
      } catch (e) {
        console.log("could not connect");
      }

const Todo = require('./models/Todo'); // importing our model to use in the application


// -------- API REQUEST BLOCK --------------

// GET ---  request for connecting to the DB
app.get('/todos', async (req, res) => {
    const todos = await Todo.find(); // find our todos using our models connected to our mongoose DB

    res.json(todos); // pass all the todos back to the file here
});

// POST ---- request for sending a new  singular todo
app.post('/todos/new', async (req, res) => {
    const todo = new Todo({ // build new todo request using the body of the req
        text: req.body.text
    });

    todo.save();

    res.json(todo); // pass all the todos back to the file here
});

// DELETE  --- using parameter in URI strig
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

// PUT --- using URI string id again and flipping the value for complete
app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save(); // save the todo completion status

    res.json(todo);
});
      
app.listen(3001, ()=> console.log("server started on port 3001"));