import User from "./UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

const gravatarImage = (email) => {
  const refinedEmail = email.trim().toLowerCase();
  const hashedEmail = crypto
    .createHash("sha256")
    .update(refinedEmail)
    .digest("hex");
  return `https://www.gravatar.com/avatar/${hashedEmail}`;
};

const addRegisteredUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const profileUrl = gravatarImage(email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const errorInfo = {
        field: "email",
        message: "User with this email already exists",
      };
      return res.status(400).json(errorInfo);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const favoritesList = [];
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      profileUrl,
      favoritesList,
    });
    await newUser.save();

    const payload = {
      email: email,
      fullname: fullname,
      profileUrl: profileUrl,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
    });

    return res.status(201).json("User Added");
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  } finally {
    next();
  }
};

export default addRegisteredUser;
