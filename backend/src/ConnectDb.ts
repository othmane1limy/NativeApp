import mongoose from 'mongoose'


const ConnectDb= async()=>{
  try {
    const connection=await mongoose.connect(
      "mongodb+srv://limyothmane:Hkgz7KdclD8gtpH3@cluster0.cx9nhf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    if (connection){
      console.log('connect to DB successfully')
    }

  } catch (error) {
    console.log(error)
  }
}
export default ConnectDb