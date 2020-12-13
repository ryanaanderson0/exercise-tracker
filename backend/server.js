const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

//declare the mongoDB enviornment variable
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//declaring the node enviornment variable
const node_uri = process.env.NODE_ENV;

// sets the build folder as static during production
if(node_uri === 'production') {
  app.use(express.static( 'build'))
} 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
