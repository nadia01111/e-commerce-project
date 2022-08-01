"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getItems,
  getItemById,
  getCompanies,
  createCart,
  addItemToCart,
  deleteItemFromCart,
  goCheckOut,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))
  //get all items in the database
  .get("/getItems", getItems)
  //gets item based on id (param passed during fetch)
  .get("/getItem/:id", getItemById)
  //gets all companies
  .get("/getCompanies", getCompanies)
  // returns unique cartId
  .get("/api/createCart", createCart)
  // Is it a good idea to have the endpoint starting with "/api/.... " ??
  .put("/api/addItemToCart", addItemToCart)
  //go to CHECKOUT
  .put("/api/goToCheckOut", goCheckOut)
  // deletes itemId from user's cart
  .delete("/api/deleteItemToCart", deleteItemFromCart)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
