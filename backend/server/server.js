const express = require('express');
const notes = require('./data/note');
const dotenv = require('dotenv')
const app = express();
dotenv.config()
app.get('/' , (req,res)=>{
    res.send("Api is Running.....")
})

app.get('/api/notes' , (req,res)=>{
     res.json(notes)  
})

app.get('/api/notes/:id' , (req,res)=>{
    const note = notes.find((n)=>n._id === req.params.id);
    console.log(note);
    res.send(note)
})
const PORT = process.env.PORT || 6000
app.listen(PORT,console.log(`Server run on PORT ${PORT}` ))