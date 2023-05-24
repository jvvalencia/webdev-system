const mongoose = require("mongoose")

mongoose.set('strictQuery', false);

const DB = "mongodb://127.0.0.1:27017/mydb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"
mongoose.connect(DB).then(() => {
    console.log("Connection is successfully setup..")
}).catch((e)=>{
    console.log(e);
    console.log("Connection is not build...");
});