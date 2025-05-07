import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookies } from "../utils/generateToken.js"

export const signup = async (req, res) => {
  try {
    const {username, email, password} = req.body

    if(!username || !email || !password) return res.status(400).json({message: "All fields are required"})

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return res.status(400).json({message:"Invalid email format"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    if(password.length < 6) return res.status(400).json({message: "Password must be atleast 6 characters"})
    
    const existingUsername = await User.findOne({username: username})
    if(existingUsername) return res.status(400).json({sucess: false, message: "Username already Existed"})
    
    const existingEmail = await User.findOne({email: email})
    if(existingEmail) return res.status(400).json({success: false, message:"Email already Existed"})

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: image
    })

    if(newUser){
      generateTokenAndSetCookies(newUser._id, res)
      await newUser.save()

      res.status(201).json({ sucess: true, user: { ...newUser._doc, password: "" } })
    }

  } catch (error) {
    console.error("Error in signup controller", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    if(!email || !password) res.status(400).json({message: "All fields are required"})

    const user = await User.findOne({email: email})
    if (!user) return res.status(404).json({ message: "invalid Username or Password" })

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return res.status(404).json({ message: "invalid Username or Password" })


    generateTokenAndSetCookies(user._id, res)

    if (req.cookies["jwt-netflix"]) {
      return res.status(400).json({ message: "User already logged in" });
    }

    res.status(200).json({success:true, user: {...user._doc, password: ""}})
    
  } catch (error) {
    console.error("Error in login controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix")
    res.status(200).json({suceess: true, message: "logout successful"})
  } catch (error) {
    console.error("Error in logout controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })

  }
}

export const authCheck = async (req,res) => {
  try {
    res.status(200).json({success:true, user: req.user})
  } catch (error) {
    console.log("error in authCheck controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })

  }
}