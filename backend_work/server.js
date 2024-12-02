const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./Controllers/userController");
const userRouters = require("./Routers/userRouters");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});

app.get("/", (_, res) => {
  res.send("Server is working");
});

app.use("/", userRouters);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "sridharan.r@mitrahsoft.com", 
    pass: "Sabeswaran1999r@", 
  },
});

app.post("/sendEmail", (req, res) => {
  const { fileName } = req.body;
  const filePath = path.join(__dirname, "uploads", fileName);

  
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  
  const mailOptions = {
    from: "sridharan.r@mitrahsoft.com", 
    to: "sridharan2001r@mitrahsoft.com", 
    subject: "Just Checking", 
    text: "Attaching the file", 
    attachments: [
      {
        filename: fileName,
        path: filePath, 
      },
    ],
  };

  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  });
});





app.use(errorHandler);

app.listen(process.env.PORT || 3320, () => {
  console.log("Server is running on port 3320");
});
