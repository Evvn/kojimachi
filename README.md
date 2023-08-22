# Kojimachi 🐧

- [Kojimachi 🐧](#kojimachi-)
  - [Dependencies 🔗](#dependencies-)
  - [Running 🏁](#running-)
  - [Use 🎲](#use-)
  - [Development 🧑‍💻](#development-)
  - [Testing 👩‍🔬](#testing-)


## Dependencies 🔗
- To run, first clone the repository and install dependencies with `npm i`
- Create a `.env` file in the root of the project, and configure the following values, eg. `PORT=1337`.

```yaml
PORT=1337
DB_USER=kojimachi
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=hunter2
```

> [ note: This setup assumes that the user database schema and tables have already been setup locally ]
> if not, create a simple `psql` table with the following:
```sql
CREATE TABLE users (
id UUID PRIMARY KEY,
name VARCHAR(256) NOT NULL,
email VARCHAR(256) NOT NULL,
password VARCHAR(256) NOT NULL
);
```

## Running 🏁
- To run the application, run `npm start`. This will compile the app code, built to `/dist`, and start `dist/server.js`.


## Use 🎲
- Optional: populate the database by running `demoData.ts`


## Development 🧑‍💻
To extend this API, future routes should be created within the `routes` directory. You can use the existing `user` routes as a template. Similarly, controllers are within `controllers` directory.

To extend the `user` service, update the `controllers/UserController.ts` file with new services.

Schema validation is handled using `joi`. The user schema is defined at `src/schemas/user.ts`, and contains the validation and error handling messages for each property.


## Testing 👩‍🔬
Unit tests are written using `jest` and `supertest`. The current functionality should currently be covered by unit tests, but new tests can be created within `src/__tests__`.

Run the test suite with `npm test`.