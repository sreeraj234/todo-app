const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todos = require("./routes/todos");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://sreeraj234:Admin@cluster0.uoy2k.mongodb.net/todo?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use("/todos", todos);

app.listen(port, () => {
  console.log("server is running on port: " + port);
});
