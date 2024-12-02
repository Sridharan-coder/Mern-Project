const {
  getAllUsersData,
  getUserData,
  createUserData,
  updateUserData,
  deleteUserData,
  getAllImageData,
  generatedUserData,
} = require("../Service/userService");

const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");

const errorHandler = async (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

const getAllUser = async (req, res, next) => {
  try {
    const count = Number(req.params["count"]);
    const users = await getAllUsersData(count * 10);
    res.header("Access-Control-Allow-Origin: *"); // CORS header
    res.status(200).json({
      success: true,
      msg: "Users fetched successfully",
      files: users,
    });
  } catch (error) {
    next(error);
  }
};

const getAllImage = async (req, res, next) => {
  const directoryPath = path.join(__dirname, "..", "uploads");
  console.log(directoryPath);
  try {
    const users = await getAllImageData();
    const files = users.map((item) => {
      const arr = item.filesPath.split("\\");
      return arr[arr.length - 1];
    });

    fs.readdir(directoryPath, (err, filesDefault) => {
      if (err) {
        console.error("Unable to scan directory:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error reading files" });
      }

      //   // Generate URLs for each file
      const fileURLs = files.map((file) => ({
        filesPath: `${req.protocol}://${req.get("host")}/uploads/${file}`,
      }));

      res.json({ success: true, files: fileURLs });
    });

    // res.header("Access-Control-Allow-Origin: *"); // CORS header
    // res.status(200).json({
    //   success: true,
    //   msg: "Users fetched successfully",
    //   files: users,
    // });
  } catch (error) {
    next(error);
  }

  // Read all files from the directory
  // fs.readdir(directoryPath, (err, files) => {
  //   if (err) {
  //     console.error("Unable to scan directory:", err);
  //     return res.status(500).json({ success: false, message: "Error reading files" });
  //   }

  // Generate URLs for each file
  //   const fileURLs = files.map((file) => ({
  //     filesPath: `${req.protocol}://${req.get("host")}/uploads/${file}`,
  //   }));

  //   res.json({ success: true, files: fileURLs });
  // });
};

const getUser = async (req, res, next) => {
  try {
    const uid = req.params["id"];
    const user = await getUserData(uid);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.header("Access-Control-Allow-Origin: *");
    res.status(200).json({
      success: true,
      msg: "User fetched successfully",
      file: { ...user._doc },
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const hostPath = path.join(
      "http://localhost:3320/backend_work",
      "uploads",
      req.file.filename
    );

    await createUserData(hostPath, req.file.originalname);

    res.header("Access-Control-Allow-Origin: *");
    res.status(201).json({
      message: "File uploaded successfully!",
      file: req.file.originalname,
    });
  } catch (error) {
    next(error);
  }
};

const downloadFile = (req, res, next) => {
  try {
    const fileName = req.params.id;
    const filePath = path.join(uploadDir, fileName);

    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      const error = new Error("File not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const inputData = req.body;
    const uid = Number(req.params["id"]);
    if (!Object.keys(inputData).length) {
      const error = new Error("Invalid input data");
      error.statusCode = 400;
      throw error;
    }
    if (req.files) {
      const fileLinks = req.files.map((file) => file.path);
      inputData.files = fileLinks;
    }
    await updateUserData(uid, inputData);
    res.status(200).json({
      success: true,
      msg: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const uid = Number(req.params["id"]);
    const user = await deleteUserData(uid);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      msg: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const generateEvent = async (req, res, next) => {
  try {
    // const hostPath = path.join(
    //   "http://localhost:3320/backend_work",
    //   "uploads",
    //   req.file.filename
    // );

    // await createUserData(hostPath, req.file.originalname)
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      // Save or process the PDF
      console.log("PDF received", pdfBuffer);
      res.json({ message: "PDF uploaded successfully" });
    });
    // console.log(req.file);
    // console.log(req.files);
    // console.log(req.body);

    // await generatedUserData(req.body)

    // res.header("Access-Control-Allow-Origin: *");
    // res.status(201).json({ message: "File Generated successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  getAllImage,
  getUser,
  createUser,
  downloadFile,
  updateUser,
  deleteUser,
  generateEvent,
  errorHandler,
};
