const mongoose = require('mongoose');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    // Get the collection from the model
    const collection = db.collection(collectionName);

    // Check if the collection exists
    const collections = await db.db.listCollections({ name: collectionName }).toArray();

    if (collections.length) {
      // Drop the collection if it exists
      await collection.drop();
      console.log(`Collection ${collectionName} dropped.`);
    } else {
      console.log(`Collection ${collectionName} does not exist.`);
    }
  } catch (err) {
    console.error(`Error dropping collection ${collectionName}:`, err);
    throw err;
  }
};
