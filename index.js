const express = require("express");
require("dotenv").config();

const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
});

const PORT = process.env.PORT || 3000;

const UserRouter = require("./routers/userRouter");

const UserController = require("./controllers/userController");

const db = require("./db/models/index");
const { user } = db;

const userController = new UserController(user);

const userRouter = new UserRouter(userController, checkJwt).routes();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express app listening on port ${PORT}!`);
});
