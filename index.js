const express = require('express');
const app = express();
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require("../backend/routes/userRoute.js");

dotenv.config();
const PORT = 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('common'))

app.use('/api/users', userRoutes);


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error : ${error}`);
        process.exit(1);
    }
}
connectDB();
app.listen(PORT, () => {
    console.log(`Server is runing on ${PORT}`);
})