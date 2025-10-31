// // server/server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import multer from "multer";
// import postRoutes from "./routes/posts.js";
// import categoryRoutes from "./routes/categories.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// // Static folder for image access
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Multer setup for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // Upload route (optional)
// app.post("/api/upload", upload.single("image"), (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Image uploaded successfully!",
//     filePath: `/uploads/${req.file.filename}`,
//   });
// });

// // Routes
// app.use("/api/categories", categoryRoutes);
// app.use("/api/posts", postRoutes);

// // Default route for health check
// app.get("/", (req, res) => res.send("✅ MERN Blog API is running..."));

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ DB Connection Error:", err.message));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import postRoutes from "./routes/posts.js";
import categoryRoutes from "./routes/categories.js"; // ✅ correct route import

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// ✅ MongoDB connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ Missing MONGO_URI in .env");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

// ✅ Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes); // ✅ correct posts route
app.use("/uploads", express.static("uploads"));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("MERN Blog API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});