import path from "path"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"


import connectMongoDB from "./db/connectMongoDB.js"
import loginRoute from "./routes/loginRoute.js"
import employeeRoute from "./routes/employeeRoute.js"

dotenv.config()
const app=express();
const port=process.env.PORT || 5000
const __dirname=path.resolve()
const corsOptions = {
	origin: 'http://localhost:5000', 
	credentials: true, 
  };
  

app.use(express.json({limit:"5mb"}))

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))


app.use("/api/admin",loginRoute)
app.use("/api/employee",employeeRoute)


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectMongoDB()

})



