
const mongodb = require('mongodb');
require('dotenv').config()

const dburl = process.env.dbConnection;


const mongoClient = mongodb.MongoClient

module.exports = {mongodb,dburl,mongoClient}