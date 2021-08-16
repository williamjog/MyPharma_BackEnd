require('dotenv').config();

const { MongoClient } = require('mongodb');

const connection = async (collectionName) => {
  const connect = await MongoClient.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return connect.db(process.env.DB_NAME).collection(collectionName);
};

module.exports = connection;