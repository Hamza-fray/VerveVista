import UserM from "../models/UserM.js"; // Assuming .mjs extension for ESM
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function registerUser(
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  facebook,
  twitter,
  instagram,
  tiktok,
  youtube,
  avatar,
) {
  try {
    const createUser = new UserM({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      facebook,
      twitter,
      instagram,
      tiktok,
      youtube,
      avatar,
    });
    return await createUser.save();
  } catch (err) {
    throw err;
  }
}

export async function checkuser(phoneNumber) {
  try {
    return await UserM.findOne({ phoneNumber });
  } catch (error) {
    throw error;
  }
}

export async function generateToken(tokenData, secretKey, jwt_expire) {
  return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
}

export async function comparePassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("oldpwd", hashedPassword);
    console.log("new", password);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

export async function generateCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  const codeLength = 4;

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

export default { comparePassword, generateToken, checkuser, registerUser,generateCode };

