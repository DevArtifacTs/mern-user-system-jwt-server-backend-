const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // await mongoose.connect('mongodb://localhost:27017/test')
        mongoose.connect(process.env.DATA_BASE);
        console.log(mongoose.connection.readyState);
        console.log('connected to mongoDB');
    
    } catch(err){
        console.log('err: ', err.message);
        process.exit();
    }
}

module.exports = connectDB;