import express,{ Express ,RequestHandler} from "express";
import {Create,searchMar, Delete, Getall, Getone,  Update } from "../Controlers/MareyeurControler";
import { authenticationMiddleware } from "../middleware/userMid";


const MarRoute=express.Router()
MarRoute.use(authenticationMiddleware)


MarRoute.route('/search').get(searchMar)

MarRoute.route('/all').get(Getall)

MarRoute.route('/:id').get(Getone)

MarRoute.route('/').post(Create)

MarRoute.route('/:id').put(Update)

MarRoute.route('/:id').delete(Delete)



export default MarRoute






