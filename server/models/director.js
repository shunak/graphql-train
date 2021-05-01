const mongoose = require('mongoose')

const Schema = mongoose.Schema

const directorSchema = new Schema({
    name: String,
    age: Number
})

//first argument; name tag, second argument: schema which is exported
module.exports = mongoose.model("Director",directorSchema)