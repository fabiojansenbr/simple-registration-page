
Simple Registration Page

> A Simple Registration RestAPI with Bootstrap 4 and Jquery as Frontend

## Getting Started

> [[Technologies](#technologies-used) &middot; [Testing Tools](#testing-tools) &middot; [Installations](#installations) &middot; [API Endpoints](#api-endpoints) &middot; [Tests](#tests) &middot; [Author](#author)


## Technologies Used
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express.js](https://expressjs.com/)
- [JWT Authentication](https://github.com/auth0/node-jsonwebtoken#readme)
- [Sequelize (Node.js ORM)](http://docs.sequelizejs.com/)

## Testing Tools

- [JEST](https://jestjs.io/)

## Installations

#### Getting started

- You need to have Node, NPM, and PostgreSQL installed on your computer.
- Installing [Node](node) automatically comes with npm.

#### Clone

- Clone this project to your local machine `https://github.com/ambiyansyah/simple-registration-page.git`

#### Setup

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
  ```shell
  $ npm start
  ```
- Use `http://localhost:3000` as base url for endpoints

## API Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS                  |
| ------ | --------------------------------------- | ---------------------------|
| POST   | Login user                              | `/api/v1/auth/login`       |
| POST   | Register user                           | `/api/v1/auth/register`    |
| POST   | Check unique email & mobile number      | `/api/v1/auth/unique-check`|
|        |                                         |                            |
| POST   | Add a user                              | `/api/v1/user`             |
| POST   | Get user logged in                      | `/api/v1/user/info`        |
| GET    | Get all user                            | `/api/v1/user`             |
| PUT    | Update details of user                  | `/api/v1/user/:userId`     |
| GET    | Get a user particular user              | `/api/v1/user/:userId`     |
| DELETE | Remove a user                           | `/api/v1/user/:userId`     |


## Tests

- Run test for all endpoints
  > run the command below
  ```shell
  $ npm run test
  ```


## Author

- Risyal Ambiyansyah  
