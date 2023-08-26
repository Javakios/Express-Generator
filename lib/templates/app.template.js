module.exports = `
// Initialize main packages 
const express = require('express');
const bodyParser = require('body-parser');

//http logger
const logger = require('morgan');

// port 
const port = 3000;

//create the app instance 
const app = express();


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


// error middleware
app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
})

// server listener 
app.listen(port,()=>{
    console.log('App Is Listening on http://localhost:3000');
})
`;