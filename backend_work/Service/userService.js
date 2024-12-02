// const {event,Users} = require("../Models/schema/");

const { Users, Events } = require("../Models/schema");

const getAllUsersData = (count) => {
  return Users.find().skip(count).limit(10);
};

const getAllImageData = () => {
  return Users.find({
    filesPath: {
      $regex: ".(jpg|jpeg|png|gif|webp)$",
      $options: "i",
    },
  });
};

const getUserData = async (uid) => {
  return await Users.findOne({ _id: uid });
};

const createUserData = async (hostPath,originalname) => {
  const id=Math.floor(10000+(Math.random()*9000))
  const newUser = new Users({
    uid:id,
    filesPath: hostPath,
    fileName: originalname,
    way:"uploaded"
  });
  return await newUser.save();
};

const updateUserData = async (uid, inputData) => {
  return await Users.findOneAndUpdate({ _id: uid }, inputData, {
    new: true,
  });
};

const deleteUserData = async (uid) => {
  return await Users.findOneAndDelete({ _id: uid });
};


const generatedUserData=async(inputData)=>{
  const id=Math.floor(10000+(Math.random()*9000))
  const newEvent = new Events({
    uid:id,
    eventName:inputData.eventName,
    name:inputData.name,
    phoneNumber:inputData.phoneNumber,
    location:inputData.location,
    date:inputData.date,
    way:"generated"
  });
  return await newEvent.save();
}



module.exports = {
  getAllUsersData,
  getAllImageData,
  getUserData,
  createUserData,
  updateUserData,
  deleteUserData,
  generatedUserData
};
