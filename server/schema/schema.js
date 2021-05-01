// Schema represents for specification of graphql api
const graphql = require("graphql"); // create graphql object
const Movie = require("../models/movie"); // import Movie model
const Director = require("../models/director"); // import Director model

// Get graphql oject type from graphql object
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;

// GraphQLObjectType is a format for Type. it enables creating instance.
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// RootQuery : For external accessor
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // Getting data process from mongoDB
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Director.findById(args.id);
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
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
        });

        return director.save();
      },
    },
  },
});

// module is exported to app.js
module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
