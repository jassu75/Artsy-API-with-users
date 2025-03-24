import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ authenticated: false });
      } else {
        return res.status(200).json({
          authenticated: true,
          user: {
            email: payload.email,
            fullname: payload.fullname,
          },
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      authenticated: false,
      message: err,
    });
  } finally {
    next();
  }
};

export default checkAuth;
