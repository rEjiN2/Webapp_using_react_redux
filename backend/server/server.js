const express = require('express');
const app = express();
const notes = require('./data/note');
const dotenv = require('dotenv')

const cors = require('cors');

const connectDB = require('./config/db');
const userRoutes = require('../routes/userRoutes');
const { notFound, errorHandler } = require('../middlewares/errorMiddleware');

dotenv.config({path:'config.env'})
app.use(cors())
connectDB(); 
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Api is Running")
    console.log("njn vanneda");
})


app.get('/api/notes', (req,res)=>{
    res.json(notes)
})

app.get('/api/notes/:id' , (req,res)=>{
    const note = notes.find((n)=>n._id === req.params.id);
    console.log(note);
    res.send(note)
})

app.use('/api/users',userRoutes)
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT)