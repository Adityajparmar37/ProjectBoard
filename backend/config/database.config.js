const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

module.exports = dbconnect;