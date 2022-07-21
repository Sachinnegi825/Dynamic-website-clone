const express=require('express');
const app= express();

require("../src/db/connection");
const Register=require("./models/registers");
const bcrypt=require("bcryptjs");
const path=require('path');
const hbs=require('hbs');

const port= process.env.PORT || 3000;

const views_path=path.join(__dirname,"../templates/views");
const Partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));

app.set("view engine","hbs");
app.set("views",views_path);
hbs.registerPartials(Partials_path);


app.get('/',(req,res)=>{
    res.render('index');
})


app.get('/shop',(req,res)=>{
    res.render('shop');
})

app.get("/register",(req,res)=>{
    res.render("register");
});
app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/index",(req,res)=>{
    res.render("index");
});
app.post("/register",async(req,res)=>{
   try{
       
    const password=req.body.psw;
    const cpassword=req.body.Confirmpsw;
    if(password===cpassword){
           const registerdata=new Register({
            firstname:req.body.firstname,
            Lastname:req.body.Lastname,
            email:req.body.email,
            Age:req.body.Age,
            psw:req.body.psw,
            Confirmpsw:req.body.Confirmpsw
        })
        const registered=registerdata.save();
        res.status(201).render("index");
    }
    else{
        res.send("password is not matching");
    }
   }
   catch(err){
    res.status(404).send(err);
   }
});

app.post("/login",async(req,res)=>{
    
    try{
        const email=req.body.email;
        const password=req.body.psw;
        const useremail=await Register.findOne({email:email});

        const isMatch=await bcrypt.compare(password,useremail.psw);
        if(isMatch){                                                   //(useremail.psw===password)
            res.status(201).render("index");
        }
        else{
            res.send("wrong password or email");
        }

    }catch(err){
        res.status(404).send("Invalid email or password");
    }
});


app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
});