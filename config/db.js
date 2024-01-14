const mongoose = require('mongoose')

const connectDB = async() => {
    try{

        const mongoURL = "mongodb+srv://phannita016:12345@cluster0.jiea6bo.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(mongoURL, { 
            useNewUrlParser: true, useUnifiedTopology: true 
        })
        .then(() => {
          console.log('Connected to MongoDB');
        })
        .catch((error) => {
          console.error('Error connecting to MongoDB:', error);
        });

    }catch(err){
            console.log(err)
        }
}

module.exports = connectDB