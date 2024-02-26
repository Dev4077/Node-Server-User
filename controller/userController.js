const db = require('../model')
const userModel = db.userModel

const userRegister = async (req,res)=>{
    try{
        const {firstname,lastname,email,phone} = req.body
        if(!firstname){res.json({status:false,message:'Firstname required'})}
        else if(!lastname){res.json({status:false,message:'Lastname required'})}
        else if(!email){res.json({status:false,message:'Email required'})}
        else if(!phone){res.json({status:false,message:'Phone required'})}
        else{
            const isEmail = await userModel.count({email})
            if(isEmail){
                res.json({status:false,message:'Email already exists'})
            }else{
                if(req.path){
                    await userModel.create({
                        firstname,
                        lastname,
                        email,
                        phone,
                        profile_img:req.path
                    })
                    res.json({status:true,message:'Data recorded successfully...'})
                }else{
                    await userModel.create({
                        firstname,
                        lastname,
                        email,
                        phone
                    })
                    res.json({status:true,message:'Data recorded successfully...'})
                }
            }
        }
    }catch(err){
        res.json({status:false,message:err.message})
    }
}
module.exports = {
    userRegister
}