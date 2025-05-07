import jwt from "jsonwebtoken"

export const generateTokenAndSetCookies = async (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"})

  res.cookie("jwt-netflix", token, {
    maxAge: 15*24*60*60*1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env_NODE_ENV !== "development"
  })
}