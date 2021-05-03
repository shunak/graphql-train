// Schema represents for specification of graphql api
const graphql = require("graphql"); // create graphql object
const Movie = require("../models/movie"); // import Movie model
const Director = require("../models/director"); // import Director model

// Get graphql oject types from graphql object
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// GraphQLObjectType is a format for Type. it enables creating instance.
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new graphql.GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id }); // Use ".find" for List type method
      },
    },
  }),
});

// RootQuery : For external accessor, Data get dealing system
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
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
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
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        // resolve function: create moive object by using model
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
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
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        direcotrId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let updateMovie = {};
        args.name && (updateMovie.name = args.name);
        args.genre && (updateMovie.genre = args.genre);
        args.directorId && (updateMovie.directorId = args.directorId);
        return Movie.findByIdAndUpdate(args.id, updateMovie, {
          new: true, // If new is true, return value gettable.
        });
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let updateDirector = {};
        args.name && (updateDirector.name = args.name);
        args.age && (updateDirector.age = args.age);
        return Director.findByIdAndUpdate(args.id, updateDirector, {
          new: true, // If new is true, return value gettable.
        });
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Movie.findByIdAndRemove(args.id);
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Director.findByIdAndRemove(args.id);
      },
    },
  },
});

// module is exported to app.js
module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
