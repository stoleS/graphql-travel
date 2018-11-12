const graphql = require("graphql")
const _ = require("lodash")

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql

// Dummy data
let places = [
  { name: "Beograd", country: "Serbia", id: "1" },
  { name: "Pariz", country: "Francuska", id: "2" },
  { name: "London", country: "Engleska", id: "3" }
]

let visitors = [
  { name: "Petar Petrović", age: 24, id: "1" },
  { name: "Marko Marković", age: 19, id: "2" },
  { name: "Ana Jovanović", age: 20, id: "3" }
]

// Define "Place" type
const PlaceType = new GraphQLObjectType({
  name: "Place",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString }
  })
})

// Define "Visitor" type
const VisitorType = new GraphQLObjectType({
  name: "Visitor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    place: {
      type: PlaceType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(places, { id: args.id })
      }
    },
    visitor: {
      type: VisitorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(visitors, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
