import { app } from './server'

const port = process.env.PORT || '4000'

app.listen({ port: 4000 }, () => {
  console.info(`🚀 Server ready at http://localhost:${port}/graphql`)
})
