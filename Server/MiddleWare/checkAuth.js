import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      req.isAuthenticated = false;
      return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        req.isAuthenticated = false;
        return next();
      } else {
        req.isAuthenticated = true;
        req.user = {
          email: payload.email,
          fullname: payload.fullname,
          profileUrl: payload.profileUrl,
        };
        return next();
      }
    });
  } catch (err) {
    console.error(err);
    req.isAuthenticated = false;
    return next();
  }
};

export default checkAuth;
