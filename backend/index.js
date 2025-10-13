import express from "express"
import { PORT, mongodbURL } from "./config.js"
import mongoose from 'mongoose'
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

const app = express()

//middleware for parsing request body
app.use(express.json());

app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('Book store')
})

app.use('/books', booksRoute)


mongoose.connect(mongodbURL)
        .then(() => {
            console.log("App connected to database");
            app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
            })
            })
         .catch((error) => {
            console.log(error)
        })