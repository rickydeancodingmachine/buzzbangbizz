# BuzzBangBizz

## Environment prerequisites

- git
- node 10.x - Either directly from [nodejs.org](https://nodejs.org), or using the [n package](https://npmjs.com/package/n) or on a Mac using [brew](https://brew.sh/).
- yarn 1.7+ - Either directly from [yarnpkg.org](https://yarnpkg.com/en/), or on a Mac using [brew](https://brew.sh/).
- mysql community earliest 5.x - https://dev.mysql.com/downloads/mysql/ (if you don't want to install this, included is a docker-compose.yml file. If you have docker, you can spin up this image which contains mysql. )

## Quickstart

1.  Clone this repo: `https://github.com/rickydeancodingmachine/buzzbangbizz.git`

1.  Create a file at `./api/.env` containing the following:

    ```bash
    PORT=9000
    NODE_ENV=development
    SECRET_OR_KEY=WriteYourOwnSecret
    ```

1.  In a terminal, install api dependencies:

    ```bash
    # with repo root as current directory
    cd ./api
    yarn # installs dependencies for all components
    ```

1.  Update file at `./api/database/config/config.json`

    ```bash
    # replace `root` with any mysql user you want and `password` with the password for that user. But if you're using docker, then leave the config file. If you change the docker-compose.yml file password value or port value, you'll have to make the changes in the database config.json file as well.
    ```

1.  Create database in MySQL (from /api folder)

    ```bash
    mysql -u root -ppassword -Bse "CREATE DATABASE BuzzBangBizzRicky" # change `root` and `password` to match your config file or change `password` to match your docker-compose.yml file
    ```

1.  Migrate db schema (from /api folder)

    ```bash
    ./node_modules/.bin/sequelize db:migrate # may get error denying access for this command depending on MySQL settings
    ```

1.  Install client dependencies

    ```bash
    # get from current ./api directory to ./client directory
    cd ..
    cd ./client
    yarn # installs dependencies for all components
    ```

1.  Build client ./build folder

    ```bash
    # from client folder
    yarn build
    ```

1.  Once client build folder is complete, start api server

    ```bash
    # with repo root as current directory
    cd ./api
    yarn start
    ```

1.  Open any browser, open `http://localhost:9000/` and you're off and running

## Tradeoffs

Considering the small amount of information and pages required for the client, I decided to manage state from the main react component, App.tsx, as opposed to implementing Redux. Therefore, state management (including handling http requests) is non-standard.

Non-standard API design. Did not implement standard Crud operations, as the scope of the project was small enough to work easily without it.

Used Sequelize ORM as it is an ORM designed for Node (Javascript) which makes code more readable and db requests easier to build with node. It also removes the danger of SQL injection.

No session management. Used JSON Web Tokens and set a 1 hour expiration time. Consequently, no real "logout" functionality on the backend, as JSON Web Token will always authorize request until past expiration time. Implemented a sudo-logout function on the client, which just removes the auth token from local storage, simulating logout functionality for the client.

Instructions said to use a minimum of HTML, CSS, and Javascript, so I chose to use react for the client because a) it makes managing state across multiple components much easier than without it, and b) React provides a great starter package which include webpack and babel, allowing me to break my Single Page App javascript and css into components and write es6. I considered the api code to be not as important for this project as the client code. Therefore, I wrote just enough to get the small number of end points to work properly. I used express (and a small suit of middleware that goes along with it), to quickly get the endpoints running. I also used Sequelize, a node ORM that works with MySQL, as it makes starting the database, and migrating the db schema very easy on any machine. I didn't implement Typescript for the api, as I'd never done it myself, and it would require more learning that I was able to commit for this project.

## Missing (that I'm aware of)

Error boundaries for api and client.

## Explanation of Dependencies

### Client

```bash
axios # simple library for making XMLHttpRequests in a developer friendly way
bootstrap # VERY easy way to make UI look great across browsers and screen-sizes without spending tons of time.
jwt-decode # Easy library for decoding JSON Web Tokens
react # explained above
react-dom # required to use react
react-router-dom # mounts react to the DOM
react-scripts # utility library for react start scripts
react-scripts-ts # need this when using typescript
reactstrap # Bootstrap components designed for React (i.e. <div class="row"> => <Row>). Lots of component types, just makes creating great UI's super easy.
```

### Api

```bash
bcrypt # simple library to hash passwords
body-parser # express middleware which extracts the body from the request stream. Saves developer the trouble of building the body from the request stream themselves.
dotenv # loads environment variables, so sensitive variables can be kept in .env file, and exclude from git commits
express # explained above
morgan # HTTP request logger middleware
mysql2 # MySQL client for node
passport # simple way to create sessions and sign JWT tokens.
passport-jwt # required to use passport JWT strategy
sequelize # explained above
sequelize-cli # nice command line interface library, make migrating schema simple from the command line.
serve-favicon # helpful express middleware to serve favicon.ico to client
```
