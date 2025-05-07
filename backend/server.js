import express from "express";
import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import searchRoutes from "./routes/search.route.js"
import tvRoutes from "./routes/tv.route.js"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
65

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: ['http://localhost:5173', 'https://netflix-cone-frontend.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute, tvRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  connectDB()
})
