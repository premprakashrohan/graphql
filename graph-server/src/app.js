const express = require('express') ;
const {graphqlHTTP} = require('express-graphql') ;

const PORT = 3000 ;
const app = express() ;


app.use('/gql', graphqlHTTP({}))
app.use('/', (req, res) => res.send('6) GQL server .....')) ;

module.exports = app ;