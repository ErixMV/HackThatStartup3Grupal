import "regenerator-runtime/runtime.js";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { helmetOpts, passport } from './app/index';
import './app/database';
import routes from './routes';
import xss from 'xss-clean';
import morgan from 'morgan';
import session from 'express-session';

import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
// Express server initialization
const app = express();

// Server middlewares
app.use(cors());
app.use(helmet(helmetOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: "SECRET",
    resave: true,
    saveUninitialized: true
}))

// Server API REST routes
app.use('/api', routes);

// Server GRAPHQL API route
app.use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true
}));


export default app;