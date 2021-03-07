import express, { Request, Response } from "express";
import mongoose from "mongoose";
import UserRoute from "./middlewares/UserRoute";

const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/user", UserRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to our API!",
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
