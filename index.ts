import { app } from './server'
import { setProperties } from './database'
import { properties } from './__fixtures__/properties'

const port = process.env.PORT || '4000'

setProperties(properties)

app.listen({ port: 4000 }, () => {
  console.info(`🚀 Server ready at http://localhost:${port}/graphql`)
})
