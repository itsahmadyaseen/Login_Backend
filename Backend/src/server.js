import mongoose, { Schema } from "mongoose";
import express from "express";
import cors from "cors";
import bcrypt from 'bcrypt'

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "*",
    credential: true,
  })
);

console.log(
  "MongoDB URI:mongodb+srv://ahmadyaseen:Birth%4020032004@cluster0.3gn93yl.mongodb.net/",
  process.env.MONGODB_URI
);

mongoose.connect(
  "mongodb+srv://ahmadyaseen:Birth%4020032004@cluster0.3gn93yl.mongodb.net/",
  {
    dbName: "Login-Details", // database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

console.log("New database");
console.log(`\n MongoDB connected `);

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("New JJJ");
});

app.post("/api/signup", async (req, res) => {
  try {
    console.log("Start");

    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Backend Error signing up:", error.message);
    return res.status(500).json({ message: "Backend Error signing up" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const matchPass = await bcrypt.compare(password, exist.password);

    if (!matchPass) {
      return res.status(400).json({ message: "Wrong password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Port is running on server ${PORT}`);
});
