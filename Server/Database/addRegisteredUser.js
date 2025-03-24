import User from "./UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addRegisteredUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const errorInfo = {
        field: "email",
        message: "User with this email already exists",
      };
      return res.status(400).json(errorInfo);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();

    const payload = {
      email: email,
      fullname: fullname,
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
