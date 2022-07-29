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
    const db =  client.db("E-Commerce_Project");
    const items = await db.collection("Item Data").find().toArray();
    // console.log(items);
    return res.status(200).json({
      status: 200,
      body: items,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    client.close();
  }
};

module.exports = {
  getItems,
};
