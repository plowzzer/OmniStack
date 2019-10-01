const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

// req.query = get url query -> ?age=20 (/users?age=20) filters
// req.params = get url params -> :id (/users/1) edit and delete
// req.body = get request body -> {JSON} (/users) create and edit
mongoose.connect(
  "mongodb+srv://omnistack_user:omnistack@omnistack9-r1jlh.mongodb.net/week09?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
