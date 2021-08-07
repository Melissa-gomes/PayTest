const mongoClient = require('mongodb').MongoClient;
const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/Bank';

const DB_NAME = 'Bank';
const connect = async () => mongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connect;