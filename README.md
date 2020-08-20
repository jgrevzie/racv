# RACV coding test




I decided to use GraphQL because
 - in a real production project, we'd likely want to get at more data
 - GraphQL handles parameter error checking, defining 'routes' etc
 - it's simple
 
I intended to use TypeGraphQL to keep the code DRY (eliminates the need to define GraphQL types 
_and_ Typescript types). However, I wasn't sure if you'd used similar. The decorator syntax 
is confusing if you haven't seen it. I decided not to use it for that reason.

I would not use `nodemon` in production. I figured this example didn't need a full build chain.

