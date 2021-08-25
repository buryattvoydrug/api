const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const staffRoute = require("./routes/staffs");
const historyRoute = require("./routes/histories");
const awardRoute = require("./routes/awards");
const groupRoute = require("./routes/groups");
const eventRoute = require("./routes/events");
const mainRoute = require("./routes/main");
const contactRoute = require("./routes/contacts");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/staffs", staffRoute);
app.use("/api/histories", historyRoute);
app.use("/api/awards", awardRoute);
app.use("/api/groups", groupRoute);
app.use("/api/events", eventRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/main", mainRoute);


app.listen(process.env.PORT || "5000", () => {
  console.log("Backend is running.");
});
