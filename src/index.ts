import express,{Express} from "express";
import serverconfig  from "./config/server.config";

const app:Express =express();

app.listen(serverconfig.PORT,()=>{
    console.log(`served started at port ${serverconfig.PORT}`)
})
