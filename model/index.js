const mongoose = require('mongoose')
const config = require('../config/config')
const userModel = require('./userModel')
const authModel = require('./authModel')
const db = {}
db.mongoose = mongoose
db.mongodb = config.MONGO_DB
db.userModel = userModel
db.mongodb = config.MONGO_DB_AUTH
db.authModel = authModel
module.exports = db

