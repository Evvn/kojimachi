# Kojimachi 🐧

- [Kojimachi 🐧](#kojimachi-)
  - [Dependencies 🔗](#dependencies-)
  - [Running 🏁](#running-)
  - [Use 🎲](#use-)
  - [Development 🧑‍💻](#development-)

## Dependencies 🔗
- To run, first clone the repository and install dependencies with `npm i`
- Create a `.env` file in the root of the project, and configure the following values, eg. `PORT=1337`.

```yaml
PORT=1337
DB_USER=teddy
DB_HOST=localhost
DB_NAME=kojimachi
DB_PASSWORD=hunter2
```

> [ note: This setup assumes that the user database schema and tables have already been setup locally ]

## Running 🏁
- To run the application, run `npm start`. This will compile the app code, built to `/dist`, and start `dist/server.js`.

## Use 🎲
- Optional: populate the database by running `demoData.ts`

## Development 🧑‍💻
To extend this API, future routes should be created within the `routes` directory. You can use the existing `user` routes as a template. Similarly, controllers are within `controllers` directory.

To extend the `user` service, update the `controllers/UserController.ts` file with new services.