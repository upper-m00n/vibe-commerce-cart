const mongoose = require('mongoose')

const cartItemSchema= new mongoose.Schema({
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    }
})

module.exports= mongoose.model('CartItem',cartItemSchema);