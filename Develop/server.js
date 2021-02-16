const express = require("express");
const logger = require("morgan");
const Mongoose = require("mongoose");
const bodyParser = require('body-parser');

const PORT =3002;
const app = express();

app.use(logger("dev"));
 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

Mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/workout", 
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useFindAndModify: false
  });
app.use(bodyParser.json())
app.use(require("./routes/htmlRoutes"))
app.use(require("./routes/apiRoutes"))
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});