const express = require('express')
const cors= require('cors');
const { default: mongoose } = require('mongoose');

require('dotenv').config()

const app =express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MONGO DB connected")
        app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
    }
    )
    .catch((err) => console.log(err));

app.get('/', (req,res)=>{
    res.send("API is working");
});