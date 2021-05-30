import 'regenerator-runtime/runtime.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import helmetOpts from './app/helmet';
import './app/database';
import routes from './routes';
import xss from 'xss-clean';
import morgan from 'morgan';

import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import rpUser from './api/user/repository';
import { compareHash } from '../src/api/user/utils/bcrypt';
const connectEnsureLogin = require('connect-ensure-login');
import ctrlUser from './api/user/controller';

const GitHubStrategy = require('passport-github2').Strategy;

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

// Passport config
passport.use(
  new LocalStrategy(async function (username, password, cb) {
    try {
      const response = await rpUser.findByUsername(username);
      if (!response) {
        return cb(null, false);
      }
      if (await !compareHash(password, response.password)) {
        return cb(null, false);
      }
      return cb(null, response);
    } catch (error) {
      return cb(error);
    }
  }),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: '4d4c1cbd5267fffd17ef',
      clientSecret: 'a7ccfd1b4da227ff4b21472c31f7cba4058c6b7b',
      callbackURL: 'http://localhost:3000/github',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const response = await rpUser.findByUsername(profile.username);
        if (!response) {
          return done(null, false);
        }
        return done(null, response);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const response = await rpUser.findById(id);
    cb(null, response);
  } catch (error) {
    console.error('ERROR', error);
    return cb(error);
  }
});

app.use(
  require('express-session')({
    secret: 'secretNuWe',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Server API REST routes
app.use('/api', connectEnsureLogin.ensureLoggedIn(), routes);

// Server GRAPHQL API route
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true,
  }),
);

app.use('/login', passport.authenticate('local'), (req, res) =>
  res.send({
    OK: 1,
    message: 'authorized user',
  }),
);

app.use('/signup', ctrlUser.add);

app.get('/auth/error', (req, res) => res.send('Unknown Error'));

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user'] }),
);

app.get(
  '/github',
  passport.authenticate('github', { failureRedirect: '/auth/error' }),
  function (req, res) {
    res.redirect('/');
  },
);

export default app;
