const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    email : {type:String,required:true},
    contact : {type:Number,required:true},
    address1 : {type:String,required:true},
    address2 : {type:String,required:true},
    role : {type:String,required:true},
    flag : {type:Boolean},
    // profile_img : {type:String,required:false}
},{timestamps:true})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel