const express = require("express");
const handlebars = require("express-handlebars");
const indexRoutes = require("./routes/indexRoutes");
const app = express();
const PORT = 8080;

app.set("views", "./views");
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(express.static("../public"));

app.use(indexRoutes);

app.listen(PORT);
console.log(`Listen in http://localhost:${PORT}`);
