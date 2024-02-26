const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname : {type:String,required:true},
    lastname : {type:String,required:true},
    email : {type:String,required:true},
    phone : {type:Number,required:true},
    profile_img : {type:String,required:false}
},{timestamps:true})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel