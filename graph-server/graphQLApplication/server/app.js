
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');

const schema = require('./schema/schema');
const mongoose = require('mongoose');

const PORT = 3200 ;  // react would use 3000.

const app = express();


app.use(cors());

mongoose.connect('mongodb://localhost:27017/graphql',  
                  { useNewUrlParser: true, useUnifiedTopology: true  });

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

app.use('/gql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(PORT, () => console.log('GQL server (/gql):', PORT) );