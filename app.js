import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import productRouters from './routers/products';
import cors from 'cors';


const app = express();
const api = process.env.API_URL;
const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.DB_CONNECTION_URL;

//Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny')); // used to log the frontend http request information

// Routes middleware
app.use(`${api}/products`, productRouters);

// connect application with mongodb database
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'eshop-db' }).then(() => {
    console.log("Database Connection is successfull...");
}).catch((error) => {
    console.log(error);
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});