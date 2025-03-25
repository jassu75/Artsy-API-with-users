const logout = (req, res, next) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  next();
};

export default logout;
