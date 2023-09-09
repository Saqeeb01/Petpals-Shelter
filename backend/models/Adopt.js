const mongoose = require('mongoose')

const AdoptSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    pet:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
},{
    timestamp:true,
})

module.exports = Adopt = mongoose.model('Adopt', AdoptSchema)