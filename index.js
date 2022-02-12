const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const bookRouter = require("./routes/books");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static("clint/build"));
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MANGO_URL)
  .then(console.log("Connect to MongoDB"))
  .catch((err) => console.log(err));

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: imgStorage });

app.post("/api/upload", upload.single("file"), (req, res, next) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth/", authRouter);
app.use("/api/books/", bookRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "clint/build/index.html"));
});

app.listen(PORT, () => {
  console.log("server is running");
});
