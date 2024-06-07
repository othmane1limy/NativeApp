import {User} from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request,Response } from 'express'
import { Types } from 'mongoose'
import { Iuser } from '../src/typesMar/InterMar'

///fonction tuken
const getUserToken=(_id:string|Types.ObjectId)=>{
    const authUserToken=jwt.sign({_id},"express",{expiresIn:"7D"})
    return authUserToken
}



//getall users
export const getallUsers =async(req:Request,res:Response)=>{

    const getall=await User.find()
    res.send(getall)
}

//create user
export const CreateUser=async(req:Request,res:Response)=>{
    try {
        const {email,name,password}:Iuser=req.body
        const exsistUser=await User.findOne({email:email})
        if(exsistUser!=null){
            return res.send('User allready exsist')
        }
        
        const hashedPass=await bcrypt.hash(password,10)
       const user = new User({ email:email, name:name, password:hashedPass});
          await user.save();
          return res.send(user);

    } catch (error) {
        res.send(error)
    }
}



//Login user
export const loginUser  =async(req:Request,res:Response)=>{
   
    const {email,password}=req.body
    const exsist =await User.findOne({email})
    if(!exsist){
        return res.status(409).send('user not exsist !!')
    }
    const ispassword=await bcrypt.compare(password,(await exsist).password)
    if(ispassword!=null){
      const token=getUserToken(( exsist)._id)
      return res.send({
        token,
        user:{
            email:exsist.email,
            name:exsist.name
        }
      
    })
    }
    else{
       return res.send('password or user not Correct !')
    }
    
}