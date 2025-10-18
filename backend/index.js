import express from "express"
import { PORT, mongodbURL } from "./config.js"
import mongoose from 'mongoose'
import booksRoute from './routes/booksRoute.js';
import cors from 'cors'

const app = express()

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
//Option 1: Allow all origins with default of cors(*)
app.use(cors());
//Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

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