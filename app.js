'use strict';

const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

// app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

// redirect
app.get('/', function(req, res) {
  res.redirect('/products');
});

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

