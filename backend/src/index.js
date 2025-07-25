import { app } from "./app.js";
import { dbConnect } from "./db/index.js";
import dotenv from "dotenv"
dotenv.config();

dbConnect()
.then(()=>{
    app.on("error",()=>{
        console.log(`app to failed to connect the database`)
    })
    app.listen(process.env.PORT,()=>{
        console.log(`app is running on the port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(`failed to connect the mongodb server ${error.message}`)
})

