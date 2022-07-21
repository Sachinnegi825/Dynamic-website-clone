const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/dynamicData",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}
).then(()=>
    console.log("connection succesful")
).catch((err)=>{
    console.log(err);
});