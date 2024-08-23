const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./Routes/AuthRoute");
const { taskRouter } = require("./Routes/TaskRoutes");
const { auth } = require("./Middleware/AuthMiddleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks",taskRouter)
app.listen(8080, async () => {
  console.log("server is running");
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    console.log("error in connectiong");
  }
});
