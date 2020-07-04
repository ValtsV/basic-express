const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const members = require("./members");

const app = express();

// init middleware
// app.use(logger);

// handlebars middleware

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// homepage route

app.get("/", (req, res) =>
  res.render("index", { title: "Member app title", members })
);

// set static folder

app.use(express.static(path.join(__dirname, "public")));

// members api routes

app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
