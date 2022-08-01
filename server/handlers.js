"use strict";
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// returns a list of all ITEMS
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("E-Commerce_Project");
    const items = await db.collection("Item Data").find().toArray();
    // console.log(items);
    return res.status(200).json({
      status: 200,
      data: items,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

//funcion for getting specific item filtered by ID received as params
const getItemById = async (req, res) => {
  //parameter received from FE when fetching
  const _id = req.params.id;
  //creating client and connecting to it
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    //DB to which to connect to
    const db = client.db("E-Commerce_Project");
    //finding item based on param passed to handler
    const item = await db.collection("Item Data").findOne({ _id: Number(_id) });

    //send item object as data to frontend if not null
    if (item !== null) {
      return res.status(200).json({
        status: 200,
        data: item,
        message: `You have retrieved item ${item.name} from ID ${_id}`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: item,
        message: `No item with ${_id} was found`,
      });
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    //DB to which to connect to
    const db = client.db("E-Commerce_Project");
    //finding all companies
    const companies = await db.collection("Companies").find().toArray();

    //send companies object as data to frontend if not null
    if (companies.length > 0) {
      return res.status(200).json({
        status: 200,
        data: companies,
        message: "You have retrieved all companies.",
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: companies,
        message: `No companies found...`,
      });
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

//----------------------------------------------------------------------------------------------------
// CREATES unique CART ID upon loading the Home Page with an empty Array inside and returns it's ID
// to store it in LOCAL STORAGE
//----------------------------------------------------------------------------------------------------
const createCart = async (req, res) => {
  const items = [];
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("E-Commerce_Project");
    const cart = await db.collection("Cart").insertOne({ items });

    return res.status(200).json({
      status: 200,
      data: cart,
      message: "Unique Cart ID created",
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};
//----------------------------------------------------------------------------------
// adds item IDs to the customer's unique CART. Expects only one item and the cartId.
//----------------------------------------------------------------------------------
const addItemToCart = async (req, res) => {
  const _id = req.body.cartId;
  const item = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("E-Commerce_Project");

    //checks if said Cart with CartId exists
    const validateCart = await db
      .collection("Cart")
      .findOne({ _id: ObjectId(_id) });

    console.log(validateCart);
    if (validateCart !== null) {
      await db
        .collection("Cart")
        .updateOne(
          { _id: ObjectId(_id) },
          { $push: { items: item } } /* item.toString() */
        );
      return res.status(201).json({
        status: 201,
        data: item,
        message: `Item with ID ${item._id} has been added to cart ID ${_id}.`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: _id,
        message: `Cart with ID ${_id} was not found.`,
      });
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

//--------------------------------------------------------------------------------------------
// delete item IDs from the customer's unique CART. Expects only one item ID and the cartId.
//--------------------------------------------------------------------------------------------
const deleteItemFromCart = async (req, res) => {
  const _id = req.body.cartId;
  const item = req.body;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("E-Commerce_Project");

    const validateItem = await db
      .collection("Cart")
      .findOne({ _id: ObjectId(_id) });

    if (validateItem !== null) {
      await db
        .collection("Cart")
        .updateOne({ _id: ObjectId(_id) }, { $pull: { items: item } });

      return res.status(200).json({
        status: 200,
        data: item,
        message: `Item with ID ${item._id}.`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: item,
        message: `Item with ID ${item._id} was not found `,
      });
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

module.exports = {
  getItems,
  getItemById,
  getCompanies,
  addItemToCart,
  createCart,
  deleteItemFromCart,
};
