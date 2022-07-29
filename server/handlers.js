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
      body: items,
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
        body: item,
        message: `You have retrieved item ${item.name} from ID ${_id}`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        body: item,
        message: `No item with ${_id} was found`,
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
};
