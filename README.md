# Dinner-x-Change

## Development environment prerequisites

- git
- node 10.x - Either directly from [nodejs.org](https://nodejs.org), or using the [n package](https://npmjs.com/package/n) or on a Mac using [brew](https://brew.sh/).
- yarn 1.7+ - Either directly from [yarnpkg.org](https://yarnpkg.com/en/), or on a Mac using [brew](https://brew.sh/).
- mysql community earliest 5.x - https://dev.mysql.com/downloads/mysql/

## TO START APP DEV ENVIRONMENT

### SET UP:

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

## Tradeoffs

Considering the small amount of information and pages required for the client, I decided to manage state from the main react component, App.tsx, as opposed to implementing Redux.

Used Sequelize ORM as it is an ORM designed for Node (Javascript) which makes code more readable and db requests easier to build with node. It also removes the danger of SQL injection.

No session management. Used JSON Web Tokens and set a 1 hour expiration time. Consequently, no real "logout" functionality on the backend, as JSON Web Token will always authorize request until past expiration time. Implemented a sudo-logout function on the client, which just removes the auth token from local storage, simulating logout functionality for the client.

## Dependencies

YARN install will download all the following dependencies:
(Create-react-app was used to set up the skeleton of the client code.)
• react, react-dom, react-scripts, react-router-dom
(Typescript is used)
• react-scripts-ts
• Bootstrap to utilize features for responsive design.
• Reactstrap to utilize common UI components designed for React.

## DevDependencies

• @types/react, @types/
• typescript, awesome-typescript-loader, source-map-loader
