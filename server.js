//import all libaries

//1.create server using express as a framework
const express = require('express');
//2.overcome cors policy using cors
const cors =require('cors')
//3.automatic collecting data from client using body-parser
const bodyParser = require('body-parser');
//4.tracking api process using morgan
const morgan = require('morgan');
//5.store confidencial data in .env flie using dotenv
require('dotenv').config();
//6.automatic reading directory using readdirSync 
const { readdirSync } = require('fs');
//import mongoDB connection
const connectDB = require('./config/db');


//define app variable to use express
const app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '20mb'}));
app.use(cors());

//Routes
/**
 * @url = localhost:`${PORT}`
 * @connect server.js to routes
 */
// ! file in loop logic will be mapped to a request path automatically by express
readdirSync('./routes')
.forEach(file => {
    app.use('/api', require(`./routes/${file}`))
});

const boot = async () => {
    //connect to mongoDB
    connectDB();
    

    const port = process.env.PORT || 4002;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

//start server
boot ();
