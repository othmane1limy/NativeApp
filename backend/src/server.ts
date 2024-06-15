import express,{ Express,Response,Request } from "express"
import dotenv from "dotenv"
import MarRoute from "../src/Routes/MareyeurRoute"
import ConnectDb from "./ConnectDb"
import userRouter from "../src/Routes/userRouter"
import cors from "cors"

const corsOption={
    origin:'*',
    methods:['POST','GET','PATCH','DELETE','PUT','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
}

const app :Express= express()
app.use(express.json())
app.use(express.urlencoded({
    extended:true}
))

app.use(cors(corsOption))
dotenv.config()
const port=process.env.PORT || 3000

ConnectDb()

app.listen(port,()=>{
    console.log('server running on port:',port)
})

app.get('/',(req:Request, res:Response)=>{
    res.send('hello')

})

//Routes


app.use('/user',userRouter)

app.use('/mareyeur',MarRoute)



