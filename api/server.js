const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

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
      
app.listen(3001, ()=> console.log("server started on port 3001"));