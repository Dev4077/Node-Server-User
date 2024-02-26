const mongoose = require('mongoose')
const config = require('../config/config')
const userModel = require('./userModel')
const db = {}
db.mongoose = mongoose
db.mongodb = config.MONGO_DB
db.userModel = userModel

module.exports = db

