import User from "./UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const errorInfo = {
        field: "email",
        message: "Email does not exist",
      };
      return res.status(400).json(errorInfo);
    }

    const dbPassword = existingUser.password;
    const checkPassword = await bcrypt.compare(password, dbPassword);
    if (!checkPassword) {
      const errorInfo = {
        field: "password",
        message: "Incorrect Password",
      };
      return res.status(400).json(errorInfo);
    }
    const payload = {
      email: existingUser.email,
      fullname: existingUser.fullname,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
    });

    return res.status(201).json("User Logged In Successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  } finally {
    next();
  }
};

export default loginUser;
