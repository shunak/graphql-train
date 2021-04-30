const express = require("express")

const graphqlHTTP = require('express-graphql') // create graphqlHTTP object

const app = express()

// To create middleware, use use method of app object
// first arg = , second argument = handler function of middleware
app.use('/graphql',graphqlHTTP({

}))

app.listen(4000, () => {
    console.log('listening port 4000')
})
