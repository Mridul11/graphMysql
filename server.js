import express from 'express'
import GraphHTTP from 'express-graphql'
import Schema from './schema'

//config

const API_PORT = 3000;
const app = express();

app.use('/graphiql', GraphHTTP({
    schema : Schema,
    pretty : true,
    graphiql: true
}));

app.listen(API_PORT, () => console.log(`connected on port ${API_PORT}`));
