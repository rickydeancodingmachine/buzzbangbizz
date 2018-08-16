## Server environment prerequisites

- git
- node 10.x - Either directly from [nodejs.org](https://nodejs.org), or using the [n package](https://npmjs.com/package/n) or on a Mac using [brew](https://brew.sh/).
- yarn 1.7+ - Either directly from [yarnpkg.org](https://yarnpkg.com/en/), or on a Mac using [brew](https://brew.sh/).
- mysql community earliest 5.x - https://dev.mysql.com/downloads/mysql/

## SET UP:

• git clone https://github.com/rickydeancodingmachine/buzzbangbizz.git
IN API FOLDER
• create file `.env` and paste:
•••
PORT=9000
NODE_ENV=development
AUTH_SECRET=WriteYourOwnSecretIfYouWant
• type `yarn` to install api dependencies
• create mysql db: (replace `root` with your mysql user and `password` with the password for that user)
••• COMMANDLINE: `mysql -u root -ppassword -Bse "CREATE DATABASE BuzzBangBizzRicky"`
• edit ./api/database/config/config.ts to make sure mysql username and password are correct
• migrate db schema
••• COMMANDLINE: `sequelize db:migrate`

IN CLIENT FOLDER
••• 'yarn'

### START:

In api folder
• yarn start
In client folder (wait till api is 'listening on port: 9000')
• yarn start

## TO START APP PRODUCTION ENVIRONMENT

### FOLLOW SET UP INSTRUCTIONS FROM DEV environment

### Add client build folder

• Enter client folder
••• COMMANDLINE: `cd ./client`
• Build process
••• COMMANDLINE: `yarn build`

### Start API, and you're ready

• Enter api folder
••• COMMANDLINE: `cd ../api`
• Start script
••• COMMANDLINE: `yarn start`

# BuzzBangBizz

## Environment prerequisites

- git
- node 10.x - Either directly from [nodejs.org](https://nodejs.org), or using the [n package](https://npmjs.com/package/n) or on a Mac using [brew](https://brew.sh/).
- yarn 1.7+ - Either directly from [yarnpkg.org](https://yarnpkg.com/en/), or on a Mac using [brew](https://brew.sh/).
- mysql community earliest 5.x - https://dev.mysql.com/downloads/mysql/

## Quickstart

1.  Clone this repo: `https://github.com/rickydeancodingmachine/buzzbangbizz.git`

1.  Create a file at `./api/.env` containing the following:

    ```bash
    PORT=9000
    NODE_ENV=development
    AUTH_SECRET=WriteYourOwnSecretIfYouWant
    ```

1.  In a terminal, install api dependencies:

    ```bash
    # with repo root as current directory
    cd ./api
    yarn # installs dependencies for all components
    ```

1.  Update file at `./api/database/config/config.json`

    ```bash
    # replace `root` with your mysql user and `password` with the password for that user
    ```

1.  Create database in MySQL (from /api folder)

    ```bash
    mysql -u root -ppassword -Bse "CREATE DATABASE BuzzBangBizzRicky" # change `root` and `password` to match your config file
    ```

1.  Migrate db schema (from /api folder)

    ```bash
    sequelize db:migrate # may get error denying access for this command depending on MySQL settings
    ```

1.  Install client dependencies

    ```bash
    # with repo root as current directory
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

## Missing

Error boundaries for api and client.

## Explanation of Dependencies
