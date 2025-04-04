import User from "./UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      req.isAuthenticated = false;
      return next();
    }

    const dbPassword = existingUser.password;
    const checkPassword = await bcrypt.compare(password, dbPassword);
    if (!checkPassword) {
      req.isAuthenticated = false;
      return next();
    }
    const payload = {
      email: existingUser.email,
      fullname: existingUser.fullname,
      profileUrl: existingUser.profileUrl,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
    });

    req.isAuthenticated = true;
    req.user = payload;
    req.favoritesList = existingUser.favoritesList;
    return next();
  } catch (err) {
    console.error(err);
    req.isAuthenticated = false;
    return next();
  }
};

export default loginUser;
