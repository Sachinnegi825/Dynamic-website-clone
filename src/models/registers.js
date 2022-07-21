const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const logindataSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },

    Lastname:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    Age:{
        type:Number,
        required:true
    },

    psw:{
        type:String,
        required:true
    },

    Confirmpsw:{
        type:String,
        required:true
    }

});

logindataSchema.pre("save",async function(next){
    if(this.isModified("psw")){

      console.log(`the password is :${this.psw}`);
      this.psw= await bcrypt.hash(this.psw,10);
      console.log(`the password is :${this.psw}`);

      this.Confirmpsw=undefined;

    }
      
      next();
})
const Register=new mongoose.model("Register",logindataSchema);

module.exports =Register;