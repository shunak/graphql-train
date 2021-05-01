// Schema represents for specification of graphql api
const graphql = require("graphql"); // create graphql object
const movie = require("../models/movie");

const Movie = require("../models/movie");

// Get graphql oject type from graphql object
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

// GraphQLObjectType is a format for Type. it enables creating instance.
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// RootQuery : For external accessor
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parents, args) {
        // Getting data process from mongoDB
        return Movie.findById(args.id);
      },
    },
  },
});

// Mutation object
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parent, args) {
        // resolve function: create moive object by using model
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
        });

        return movie.save();
      },
    },
  },
});

// module is exported to app.js
module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
