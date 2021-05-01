const express = require("express");

const { graphqlHTTP } = require("express-graphql"); // create graphqlHTTP object
const mongoose = require("mongoose"); // create mongoose object which has connect mehtod for mongoDB

const schema = require('./schema/schema') // Read schema from schema.js

const app = express();
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.hlcut.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
    console.log("Connecting to mongoDB ...");
});

// To create middleware, use use method of app object
// first arg = , second argument = handler function of middleware
app.use("/graphql", graphqlHTTP({
    schema, // add schema to middleware
    graphiql: true // graphql test tool, enables API testing only in backend
}));


app.listen(4000, () => {
  console.log("listening port 4000");
});
