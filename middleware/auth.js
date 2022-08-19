const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  const accessToken = req.cookies.token;
  if (!accessToken) {
    return res.status(403).send("Unauthorized: No token");
  } else {
    jwt.verify(accessToken, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.email = decoded.email;
        return next();
      }
    });
  }
};

module.exports = auth;