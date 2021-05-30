# Hack That Startup v3 (Individual)

This is the solution for the individual challenge of the hackathon Hack That Startup v3.

Deployed: [App](https://hackthatstartup3.herokuapp.com)

## Table of Contents

* [Starting the Project](#starting-the-project)
* [Testing Environment](#testing-environment)
* [Folders structure](#folders-structure)
* [NPM scripts](#npm-scripts)
* [Models routing](#models-routing)
  * [User](#user)
  * [Repository](#repository)
* [GraphQL](#graphql)

## Starting the project

Clone the repository

```sh
npm clone
```

Install the dependencies:
```sh
npm install
```

Make sure to create your own environment file in src/config folder. There is a sample.env, copy it and use your own variables.



Start in development mode: (Server on watch mode)
```sh
npm start
```

## Testing Environment
The project testing is done using ``Jest`` and ``Supertest`` modules. 

When the testing environment is running, Jest cannot read .env files with `env-cmd` module. For that reason, the enviroment variables are served by a JavaScript file in .jest folder. There is a sample that needs to have the asked variables.

Then, the test environment can be run.
```sh
npm test
```

## Folders structure
All the typescript code is in src folder.
| Folder / File | Description |
| ------ | ------ |
|    *api*    |   All business logic and model handlers.     | 
|    *app*    |   Express server configuration  (DB, HELMET, ...).  | 
|    *bin*    |   Server Port configuration. | 
|    *config*    |   Environment variables depending on server status (dev, prod, test, ...).     | 
|    *graphql*    |   GraphQL Api files (schema, types, resolvers,...).     | 
|    *routes*    |   Main route file for app server     | 
|    *scripts*    |  Isolated functions      | 
|    *tests*    |   Testing functions    | 
|    app.js   |   Server declaration and configuration      |

## NPM scripts

Compiler to high compability JavaScript version
```sh
npm run build
```

Server on development mode (ES6 or later).
```sh
npm start
```

Start high compability server
```sh
npm run serve
```

Delete compiled JavaScript code
```sh
npm run clean
```

Start test environment
```sh
npm test
```

Force heroku to run npm build before the start
```sh
npm run heroku-postbuild
```

## Models routing
All the routes are defined following REST convention.
### User
#### GET
Return all users:

* GET: */api/user*  

Return one user by id:

* GET: */api/user/:id* 

#### POST
Create one user

* POST: */api/user*
#### PATCH
Updated one user by id

* PATCH: */api/user/:id*
#### DELETE
Delete one user by id

* DELETED: */api/user/:id*
### Repository
#### GET
Return all repositories:

* GET: */api/repository*  

Return one repository by id:

* GET: */api/repository/:id* 

#### POST
Create one repository

* POST: */api/repository*
#### PATCH
Updated one repository by id

* PATCH: */api/repository/:id*
#### DELETE
Delete one repository by id

* DELETED: */api/repository/:id*
### Team
#### GET
Return all teams:

* GET: */api/team*  

Return one team by id:

* GET: */api/team/:id* 

#### POST
Create one team

* POST: */api/team*
#### PATCH
Updated one team by id

* PATCH: */api/team/:id*
#### DELETE
Delete one team by id

* DELETED: */api/team/:id*
### Card
#### GET
Return all cards:

* GET: */api/card*  

Return one card by id:

* GET: */api/card/:id* 

#### POST
Create one card

* POST: */api/card*
#### PATCH
Updated one card by id

* PATCH: */api/card/:id*
#### DELETE
Delete one card by id

* DELETED: */api/card/:id*

## GraphQL
The GraphQL API is an addition, can interact with the models and make requests to database.

*The setup is done but some implementations are missing for now*