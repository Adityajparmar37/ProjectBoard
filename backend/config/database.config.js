const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('DataBase Connect Successfully--');
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbconnect;