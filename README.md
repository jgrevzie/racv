# RACV coding test
### Installation
`npm i`
### Start
`npm start`

### Testing
`npm test`

### GUI / Playground
http://localhost:4000/graphql

## Commentary

I decided to use GraphQL because
 - in a real production project, we'd likely want to get at more data
 - GraphQL handles parameter error checking, defining 'routes' etc
 - it's simple

Therefore, there's no code to check the parameter types, format etc. of searches and mutations.
This is all handles by GraphQL.


Technically, the decision to use GraphQL means that there is no single endpoint that includes
`the property address, sale price and some kind of field to indicate if the property is above, 
below or equal to the avg price for properties in the suburb.` You can of course, specify all
of these attributes in your GraphQL query. There's an example of that in the tests.
 
I intended to use TypeGraphQL to keep the code DRY (eliminates the need to define GraphQL types 
_and_ Typescript types). However, I wasn't sure if you'd used similar. The decorator syntax 
is confusing if you haven't seen it. I decided not to use it for that reason.

I would not use `nodemon` in production. I figured this example didn't need a full build chain.

**What if there was a real database?**

The resolvers would need to be `async`. Errors with the db connection etc would need to be handled. 

In the example, I have separated out the 'db' logic so that the implementation (an array) is hidden.
This would be enhanced if there was a real db. Some logic (filtering / average) would be handed
off to the db itself. Network / auth errors etc would be handled in this layer, and provided
cleanly to the layer above (the resolvers) so that this could be made available to the client.

