const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,image} = req.body
    console.log(req.body.image ,"jjjjjjjjjjjjjjjjj");
   
    const userExists = await User.findOne({ email });
   
    if(userExists){
        res.status(400)
        throw new Error("User Already Exist")
    }
      
      const user = await User.create({
        name,
        email,
        password,
        image
      })
        
       if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            image:user.image,
            token:generateToken(user._id)

        })
       }
       else{
res.status(400)
throw new Error("Error Occured ")
       }
   
   
})

const authUser = asyncHandler(async(req,res)=>{
    console.log("request");
    const{name,email,password} = req.body;
 const user = await User.findOne({email});

 console.log(user);

 if(user && (await user.matchPassword(password))){
    console.log("setAA");
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        image : user.image,     
        token:generateToken(user._id)

    })
 }
 else{
    res.status(400)
    console.log("invalid");
    throw new Error("Invalid Email or Password ")
           }
})

const getImage=async(req,res)=>{
    const token = req.params.id;
    console.log(token);
   // await User.findById()
}

const getUser = asyncHandler(async(req,res)=>{
      console.log(req.params.id);
      const user = await User.findById(req.params.id)

      console.log(user.email);
      res.status(200).json({
        image:user.image,
        name:user.name,
        email:user.email
      })
})

    const updateUser = asyncHandler(async(req,res)=>{
     
          console.log(req.body.id,"lock");
          const user = await User.findById(req.body.id)
          console.log(user,"User");
          if(user){
            const update = await User.updateOne({_id:user.id},{$set:{image:req.body.image}})
            console.log("Updated imgage");
            res.status(200).json({
              _id:user._id,
              name:user.name,
              email:user.email,
              isAdmin:user.isAdmin,
              image : user.image,     
              token:generateToken(user._id)

          })
          }
          else {
            res.status(400)
            console.log("invalid");
            throw new Error("User Invalid ")
          }

    })

    const adminUsers = asyncHandler(async(req,res)=>{
      console.log("Hiiiiiiiiiiiiiiii");
      try{

        let users= await User.find();
        if(users){
           console.log("USERS fOUND");
            res.json({status:"ok",users:users})

        }else{
            console.log("no userrs found");
            res.json({status:"error",users:"users not found"})
        }

    }catch(err){

        res.json({status:"error",error:"Data not find"})
        console.log(err);
    }

      
    })

    const editUser = asyncHandler(async(req,res)=>{
      console.log(req.params.id);
    const user = await User.findById(req.params.id)
    console.log(user);
    res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      password:user.password,
      image : user.image,     
      token:generateToken(user._id)
  })
    })

    const adminUpdateUser = asyncHandler(async(req,res)=>{
     const {name,email,password,id} = req.body;
     console.log(name);
     console.log(email);
     console.log(password);
     console.log(id);
     const update = await User.updateOne({_id:req.body.id},{$set:
      {
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
      }})

      res.status(200).json({
        _id:id,
        name:name,
        email:email,
        password:password
    })


    })
    const deleteUser = asyncHandler(async(req,res)=>{
      console.log(req.params.id);
   const deleteUser =    await User.deleteOne({_id:req.params.id})
              console.log("user Left");
              res.json({status:"ok",message:"user deleted"})
    })

    const adminSearchUser =asyncHandler(async(req,res)=>{
      const username=req.params.userkey;
      try{
          const users=await User.find({
              "$or": [
                  {
                      name: { $regex: username }
                  },
                  {
                      email: { $regex: username }
                  }
              ]
          })
          res.json({status:"ok",message:"user found",users})

      }catch(err)
      {
          res.json({status:"error",message:"no user found"})
      }
  })



module.exports ={registerUser,authUser,getUser,updateUser,adminUsers,adminSearchUser,deleteUser,adminUpdateUser,editUser}