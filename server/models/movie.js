const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = new Schema({
    name: String,
    genre: String
})

// export schema model as a mongoose model
module.exports = mongoose.model('Movie', movieSchema)
