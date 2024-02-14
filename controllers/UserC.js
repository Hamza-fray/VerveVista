import UserM from "../models/UserM.js";

const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password,
      about,
      avatar,
      lastSeen,
      online,
      forgetPwd,
    } = req.body;

    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password,
      about,
      avatar,
      lastSeen,
      online,
      forgetPwd,
    };

    await UserM.findByIdAndUpdate(req.params.id, newUser);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  console.log(req.body);
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      avatar,
    } = req.body;

    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      avatar,
    };

    await UserM.findByIdAndUpdate(req.user._id, newUser);

    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserM.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  console.log("api profile");
  try {
    const user = await UserM.findById(req.user._id);
    if (user) {
    res.status(200).json(user);
      
    } else {
    res.status(404).json(user);
      
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserM.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { updateUser, updateAccount, deleteUser, getUser, getAllUsers };
