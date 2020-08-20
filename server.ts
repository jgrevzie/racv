import { ApolloServer, gql } from 'apollo-server-koa'
import { addProperty, averagePrice, filterBySuburb, getProperties } from './database'
import Koa from 'koa'

const typeDefs = gql`
  type Query {
    properties(suburb: String): [Property]
  }

  type Property {
    streetAddress: String
    suburb: String
    price: Int
    description: String
    relativeToAverage: RelToAv
  }

  enum RelToAv {
    ABOVE
    EQUAL
    BELOW
  }

  input PropertyInput {
    streetAddress: String
    suburb: String
    price: Int
    description: String
  }
  type Mutation {
    addProperty(property: PropertyInput): Property
  }
`

// noinspection JSUnusedGlobalSymbols
const resolvers = {
  Query: {
    properties: (_, { suburb }) => {
      const average = averagePrice()

      const filteredProperties = suburb ? filterBySuburb(suburb) : getProperties()

      return filteredProperties.map(toPropertyWithAverage(average))
    },
  },

  Mutation: {
    addProperty: (_, { property }) => {
      addProperty(property)
      return property
    },
  },
}

const toPropertyWithAverage = (average) => (property) => ({
  ...property,
  relativeToAverage:
    property.price > average ? 'ABOVE' : property.price < average ? 'BELOW' : 'EQUAL',
})

const server = new ApolloServer({ typeDefs, resolvers })

export const app = new Koa()

app.use(server.getMiddleware())
