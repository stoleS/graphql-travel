const graphql = require("graphql")

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql

// Dummy data
let places = [
  { name: "Beograd", country: "Serbia", id: "1", visitorsId: "2" },
  { name: "Pariz", country: "Francuska", id: "2", visitorsId: "1" },
  { name: "London", country: "Engleska", id: "3", visitorsId: "3" },
  { name: "Madrid", country: "Španija", id: "4", visitorsId: "2" }
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
    country: { type: GraphQLString },
    visitors: {
      type: VisitorType,
      resolve(parent, args) {
        return visitors.filter(visitor => visitor.id === parent.visitorsId)
      }
    }
  })
})

// Define "Visitor" type
const VisitorType = new GraphQLObjectType({
  name: "Visitor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    places: {
      type: new GraphQLList(PlaceType),
      resolve(parent, args) {
        return places.filter(place => place.visitorsId === parent.id)
      }
    }
  })
})

// Define "RootQuery" type
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Return "place" by ID
    place: {
      type: PlaceType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return places.find(place => place.id === args.id)
      }
    },
    // Return "visitor" by ID
    visitor: {
      type: VisitorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return visitors.find(visitor => visitor.id === args.id)
      }
    },
    // Return all "places"
    places: {
      type: new GraphQLList(PlaceType),
      resolve(parent, args) {
        return places
      }
    },
    // Return all "visitors"
    visitors: {
      type: new GraphQLList(VisitorType),
      resolve(parent, args) {
        return visitors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
