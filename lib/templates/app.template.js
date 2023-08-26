

const app = (port) => {
    port = !port ? 3000 : port;


    return `
// Initialize main packages 
const express = require('express');
const bodyParser = require('body-parser');

// Http logger
const logger = require('morgan');

// Port 
const port = ${port};

//Create the app instance 
const app = express();

//Import the routes
const usersRoute = require('./routes/users');

//additional headers and middlewares 
app.use(logger('dev'));
app.use(bodyParser.json()) //application/json
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

//routes go here
app.use('/users',usersRoute);

// error middleware
app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
})

// server listener 
app.listen(port,()=>{
    console.log('App Is Listening on http://localhost:${port}');
})
`

}


module.exports = app;