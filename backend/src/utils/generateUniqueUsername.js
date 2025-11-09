import User from "../models/User.model.js";

const generateUniqueUsername = async (fullName) => {
  const firstName = fullName
    .split(" ")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  let isUnique = false;
  let finalUsername = "";

  while (!isUnique) {
    const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit
    const username = `${firstName}${randomNum}`;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      isUnique = true;
      finalUsername = username;
    }
  }

  return finalUsername;
};

export default generateUniqueUsername;
