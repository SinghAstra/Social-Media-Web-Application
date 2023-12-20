const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedData) {
      req.userId = decodedData.id;
    }
  }
  next();
};

module.exports = authMiddleware;
