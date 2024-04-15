import express,{NextFunction, Request,Response,} from 'express';
import mongoRoute from './mongoexp'
import cors from 'cors';
import corsRoute from './corsproject';
import authRoute from './simpleauth';
import fileRoute from './multerfile';


const port='5000'
const app=express();
app.use(
  cors({
  origin:"*",
  methods:["PUT","GET"]
})  
)

function logger(req:Request,res:Response,next:NextFunction){
  console.log("login");
  next();
}


app.use("/",mongoRoute);
app.use("/",corsRoute);
app.use("/",authRoute);
app.use("/",fileRoute);

 


app.get("/data",(req:Request,res:Response)=>{
   res.json({name:"sai",fav:"biryani"});
    // res.send("welcome"); 
});
app.get("/home",(req,res)=>{
  res.send("welcome to home");
});


app.listen(port,()=>{
  console.log(`server is running http://localhost:${port}`);
})


