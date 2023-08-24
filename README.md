# Kojimachi 🐧

- [Kojimachi 🐧](#kojimachi-)
  - [User service API 🛰️](#user-service-api-️)
  - [Setup 🔗](#setup-)
  - [Running 🏁](#running-)
  - [Use 🎲](#use-)
  - [Development 🧑‍💻](#development-)
  - [Testing 👩‍🔬](#testing-)


## User service API 🛰️
This is a simple `node` application which runs an `express` server. The API currently supports `/login` and `/user` routes, which allow for JWT authentication and user management respectively. Using this API, you can perform CRUD operations against a user database, all secured using a JWT auth process.

This repository also includes a Postman collection to demo all the core functionality of the API, as well as unit test coverage of all the requirements for the service.

> _Current implementation of the `/login` service will always generate a valid JWT token to authenticate requests for the `/user` service. In future, the `/login` API can be extended to require a valid username & password to allow for validation prior to granting the JWT token and prevent unwanted access._

## Setup 🔗
To run, first clone the repository and install dependencies with `npm i`.
  
Set a secure JWT secret key in `src/JWTconfig.js` – currently containing a placeholder value.

Create a `.env` file in the root of the project, and configure the following values according to your preference and local postgres settings, eg. `PORT=1337`.

```yaml
PORT=1337
DB_USER=kojimachi
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=hunter2
```

> *note: This setup assumes that the user database schema and tables have already been setup locally.
> If not, create a simple `psql` table with the following spec:*
> ```sql
> CREATE TABLE users (
> id UUID PRIMARY KEY,
> name VARCHAR(256) NOT NULL,
> email VARCHAR(256) NOT NULL,
> password VARCHAR(256) NOT NULL
> );
> ```

## Running 🏁
To run the application, run `npm start`. This will compile the app code, built to `/dist`, and start `dist/server.js`. Confirm in the console that the server is running on the port you specified in `.env`.


## Use 🎲
While the server is running, you can interact with the API. There is a Postman Collection included, `/Kojimachi_User_API_test.postman_collection.json`, that has examples of the standard API functions. __Please make sure that you first authenticate and include the JWT as a part of each request.__

The `Authorization` header will need to be set in the Postman requests with the JWT that is generated when you make the `POST` request to `/login`


## Development 🧑‍💻
To extend this API, future routes should be created within the `routes` directory. You can use the existing `user` routes as a template. Similarly, controllers are within `controllers` directory.

To extend the `user` service, update the `controllers/UserController.ts` file with new services. If the service is updated, please also include updates to the Postman collection so that it maintains feature parity and accurately reflects the usage of the API.

Schema validation is handled using `joi`. The user schema is defined at `src/schemas/user.ts`, and contains the validation and error handling messages for each property.


## Testing 👩‍🔬
Unit tests are written using `jest` and `supertest`. The current functionality should currently be covered by existing unit tests, but new tests can be created within `src/__tests__`.

Run the test suite with `npm test`. This will also attempt to build & start the server first in case it is not already running.