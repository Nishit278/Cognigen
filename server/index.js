import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import cognigenRoutes from "./routes/cognigenRoutes.js"

dotenv.config()

const app = express();

//Middlewares
app.use(cors()); // cors() is a middleware here
app.use(express.json({limit: '50mb'}))
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/cognigen', cognigenRoutes)

app.get('/', async(req, res)=>{
    res.send('Hello from cognigen')
})

const startServer = async ()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, ()=> console.log('Server has started on port http://localhost:8080'))
    }catch(err){
        console.log(err);
    }
}
startServer();