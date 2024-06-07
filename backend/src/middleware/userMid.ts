import {Response,Request,NextFunction}from "express"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'
import { Iuser } from "../typesMar/InterMar"
import { User } from "../models/User"


dotenv.config()
export interface AuthRequest extends Request {
    userId?:string
}


export const authenticationMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return res.status(401).json({
        error: "Authorization is required",
      })
    }
    const token = authorization
    const  _id  = jwt.verify(token, "express") as {user:{id:string}}
    const existingUser = await User.findOne({ _id})

    if (existingUser) {
    req.userId = existingUser.id
    }
    next()
  } catch (error) {
    console.log("error in authenticationMiddleware", error)
    throw error
  }
}

