const express = require("express");
const {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllImage,
  downloadFile,
  generateEvent
} = require("../Controllers/userController");
const upload = require("../utils/upload");
const router = express.Router();
const User = require("../Models/schema");
const path = require("path");
const fs = require("fs");



router.get("/readAll/:count", getAllUser);
router.get("/readAllImage", getAllImage);
router.get("/read/:id", getUser);
router.post("/create", upload, createUser);
router.get("/download/:id", downloadFile);


router.post("/generate", generateEvent)

// router.get('/backend_work/uploads/:fileName', (req, res) => {

//     // const hostPath = path.join("http://localhost:3320/backend_work", "uploads", req.file.filename);

//     const fileName = req.params.fileName;
//     console.log("--------------", fileName);

//     const filePath = path.join(uploadDir, fileName);

//     if (fs.existsSync(filePath)) {
//         res.download(filePath);
//     } else {
//         res.status(404).json({ message: 'File not found' });
//     }
// });

module.exports = router;
