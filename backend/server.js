const express = require("express");
const mongoose = require("mongoose");
const argon2 = require('argon2');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
mongoose.connect("mongodb+srv://vishvesh:vishvesh2005@cluster0.cetal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{ useNewUrlParser: true, useUnifiedTopology: true },{
    connectTimeoutMS : 10000,
}).then(() =>{
    console.log("MongoDB connected")
}).catch((error)=>{
    console.log("connection error", error)
});
const UserSchema = new mongoose.Schema({ firstname: String, lastname: String, phone: String, mailid:{type:String, unique:true}, password:{type:String, unique:true},channel: { type: Array, default: [] },pack:{ type: Array, default: [] }});
const User = mongoose.model("User", UserSchema);
app.post("/api/users", async (req, res) => {
  try {
    const {firstname,lastname,phone,mailid,password} = req.body;
    const hashedpassword = await argon2.hash(password);
    const user = new User({
      firstname,
      lastname,
      phone,
      mailid,
      password:hashedpassword,
      channel:[],
      pack:[],
    });
    await user.save();
    res.status(201).send("User saved!");
  } catch (err) {
    if(err.code===11000){
      res.status(400).json({message:"username or password already exists"});
    }
    else{
      res.status(500).send(err.message);
    }
  }
});
app.post("/api/users/login", async (req, res) =>{
  const { mailid, password} = req.body;
  try{
    const user = await User.findOne({mailid});
    if(!user){
      return res.status(404).json({message: "USER NOT FOUND"});
    }
    const match = await argon2.verify(user.password,password);
    if(!match){
      return res.status(401).json({message: "INCORRECT PASSWORD"});
    }
    const token = jwt.sign(
      { username: user.firstname },
      'ld13ef45h67',
      { expiresIn: '1h' } 
    );
    res.status(200).json({message: "LOGIN SUCCESSFUL",token:token});
  }
  catch(err){
    res.status(500).send(err.message+"login");
  }
});
app.post("/api/users/addchannel",async(req,res)=>{
  const {pack,mailid} = req.body;
  try{
    const user = await User.findOne({mailid});
    if(!user){
      return res.status(404).json({message:""});
    }
    user.channel.push(pack);
    await user.save();
    res.status(200).json({message:"pack added to the cart"});
  }
  catch(err){
    res.status(500).send(err.message+"addchannel");
  }
});
app.delete("/api/users/removechannel",async(req,res)=>{
  const {index,mailid} = req.body;
  try{
    const user = await User.findOne({mailid});
    if(!user){
      return res.status(404).json({message:""});
    }
    if (index < 0 || index >= user.channel.length) {
      return res.status(400).json({ message: "Invalid index" });
    }
    user.channel.splice(index,1);
    user.markModified('channel');
    await user.save();
    res.status(200).json(user.channel);
  }
  catch(err){
    res.status(500).send(err.message+"removechannel");
  }
});
app.delete("/api/users/removepack",async(req,res)=>{
  const {index,mailid} = req.body;
  try{
    const user = await User.findOne({mailid});
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    if (index < 0 || index >= user.pack.length) {
      return res.status(400).json({ message: "Invalid index" });
    }
    user.pack.splice(index,1);
    user.markModified('pack');
    await user.save();
    res.status(200).json(user.pack);
  }
  catch(err){
    res.status(500).send(err.message+"removepack");
  }
});
app.get("/api/users/getchannel",async(req,res)=>{
  const {mailid} =req.query;
  try{
    const user = await User.findOne({mailid});
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    if(user && user.channel){
    res.status(200).json(user.channel);
    }
  }
  catch(err){
    res.status(500).send(err.message+"getchannel");
  }
})
app.get("/api/users/getpack",async(req,res)=>{
  const {mailid} =req.query;
  try{
    const user = await User.findOne({mailid});
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    res.status(200).json(user.pack);
  }
  catch(err){
    res.status(500).send(err.message+"getpack");
  }
})
app.post("/api/users/addpack",async(req,res)=>{
  const {channel,mailid} = req.body;
  try{
    const user = await User.findOne({mailid});
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    user.pack.push(channel);
    await user.save();
    res.status(200).json({message:"pack added to the cart"});
  }
  catch(err){
    res.status(500).send(err.message+"addpack");
  }
});
app.listen(port , ()=>{
    console.log("server is running");
})


