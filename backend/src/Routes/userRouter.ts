import express from 'express'
import { CreateUser, getallUsers, loginUser } from '../Controlers/UserControler'



const userRouter=express.Router()


userRouter.route('/create').post(CreateUser)
userRouter.route('/getall').get(getallUsers)
userRouter.route('/login').post(loginUser)


export default userRouter