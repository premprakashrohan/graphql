const express = require('express') ;
const {graphqlHTTP} = require('express-graphql') ;
const schema = require('../schemas/schema') ;

const PORT = 3000 ;
const app = express() ;


app.use('/gql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.use('/', (req, res) => res.send('6) GQL server .....')) ;

module.exports = app ;