const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");  
const router = express.Router();
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "Signup successful!" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user in MongoDB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/", async (req, res) => {
    try {
      const { movieTitle } = req.query;
      const reviews = await Review.find({ movieTitle });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews" });
    }
  });
  
  // POST a new review
  router.post("/", async (req, res) => {
    try {
      const { email, movieTitle, year, reviewText, rating } = req.body;
      const newReview = new Review({ email, movieTitle, year, reviewText, rating });
      await newReview.save();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: "Error submitting review" });
    }
  });
// router.post("/forgotpassword",async(req,res)=>{
//     const {email}=req.body;
//     try
//     {
//         const oldUser = await User.findOne({email});
//         if(oldUser)
//         {
//            return res.send("User Not Exists");
//         }  
//         const secret =JWT_SECRET .  oldUser.password;
//         const token =jwt.sign({email: oldUser.email, id: oldUser._id}.secret,{expiresIn:'5m'})
//         const link = `http:localhost:5000/reset-password/${oldUser._id}/${token}`;
//         console.log(link);
//     }
//     catch(error)
// })
// app.get('/reset-password',async(req,res)=>{
//     const {id,token} =req,params;
//     console.log(req.params); 
// })
module.exports = router;
