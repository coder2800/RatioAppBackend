const connectToMongo = require("./db.js")
const express = require("express");
connectToMongo();

const app = express();
const port = 5000;

var cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api/user', require('./routes/user.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})