import Koa from 'koa'
import { ApolloServer, gql } from 'apollo-server-koa'

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
    AVERAGE
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

type Property = {
  streetAddress: string
  suburb: string
  price: number
  description: string
}

// noinspection JSUnusedGlobalSymbols
const resolvers = {
  Query: {
    properties: (_, args) => {
      const averagePrice = properties.reduce(
        (accum: number, property: Property): number => accum + property.price / properties.length,
        0
      )

      const filteredProperties = args.suburb
        ? properties.filter(
            (property) => property.suburb.toLowerCase() === args.suburb.toLowerCase()
          )
        : properties

      return filteredProperties.map((property) => ({
        ...property,
        relativeToAverage:
          property.price > averagePrice
            ? 'ABOVE'
            : property.price < averagePrice
            ? 'BELOW'
            : 'AVERAGE',
      }))
    },
  },

  Mutation: {
    addProperty: (_, args) => {
      properties = [args.property, ...properties]
      return args.property
    },
  },
}

let properties: Property[] = [
  {
    streetAddress: '15 Easey Street',
    suburb: 'Collingwood',
    price: 1.5e6,
    description: 'lovely, outstanding',
  },
]

const server = new ApolloServer({ typeDefs, resolvers })

const app = new Koa()

app.use(server.getMiddleware())

app.listen({ port: 4000 }, () => {
  console.info('server started on port 4000 😀')
})
