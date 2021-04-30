// Schema represents for specification of graphql api
const graphql = require("graphql"); // create graphql object
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
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            resolve(parents, args) {
                
            }
        }
    }
})
