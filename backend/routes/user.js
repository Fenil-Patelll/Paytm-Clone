const express =  require("express");
const userRouter = express.Router();
const {User, Account} = require("../db")
const jwt = require("jsonwebtoken");
const zod = require('zod')
const {authmiddleware} = require("../middleware");
const JWT_SECRET = require("../config")

userRouter.post("/signup", async function(req,res){

    const userSchema = zod.object({
        userName: zod.string().email(),
        firstName : zod.string(),
        lastName : zod.string(),
        password : zod.string()
    })

    const parseResult = userSchema.safeParse(req.body);

    if(!parseResult.success){
        res.status(400).json("Invalid User Input")
        return
    }

    try{
        const user = await  User.find({userName : req.body.userName})

        if(user.length!=0){
            res.status(500).json("User already exists with the Username");
            return
        }
    }
    catch(err){
        res.json(err)
    }

    const UserData =  {
        userName : req.body.userName,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    }

    const AccountData = {
        userId : req.body.userName,
        balance : parseInt(1000*Math.random())
    }

    const newUser =  new User(UserData)
    const newAccount = new Account(AccountData)
    console.log("Acc schema log")
    console.log(newAccount);
    try{
        await newUser.save()
        await newAccount.save()
        res.status(201).json({ msg: 'User successfully created'})
    }
    catch(err){
        res.status(500).json("Can not save entry to db")
    }

})

userRouter.post('/signin', async function(req,res){
    const user = await User.find({userName : req.body.userName, password: req.body.password})
    if(user.length!=0){
        const JWT = jwt.sign({userName : req.body.userName},JWT_SECRET);
        res.status(200).json(JWT);
        return
    }
    res.status(500).json({err : "User not registered"})
})

userRouter.put('/update', authmiddleware, async function(req,res){
    const user =  await User.find({userName : req.body.userName})
    if(user.length!=0){
     const userUpdated = await User.findOneAndUpdate({userName : req.body.userName}, {userName : req.body.userName, firstName : req.body.firstName, lastName :req.body.lastName})
     console.log(userUpdated)
     res.json("User Updated")
     return
    }
    res.json("Can not Update User,as It is not registered")
 })

userRouter.post('/bulk',authmiddleware, async function(req,res){
    const filter = req.query.filter || "";
    console.log(req.query)
    const regex = new RegExp(filter, 'i');

    const filteredUsers = await User.find({ $or: [{firstName: {$regex:regex}}, {lastName : {$regex:regex}}]})

    if(filteredUsers.length!=0){
        res.json(filteredUsers.map(user => (           
             {userName : user.userName,
            firstName : user.firstName,
            lastName : user.lastName,
            })))
            return
    }
    res.json("No user with specified string")

 })

 userRouter.post('/balance',authmiddleware, async function(req,res){
    const user = await Account.findOne({userId : req.userName})
    console.log(user)
    if(user){
        console.log("hello")
        res.json(user.balance)
        return
    }
    res.status(500).json("No User found")
    
 })

module.exports =  userRouter;
