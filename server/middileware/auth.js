const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token is ", token);
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decodedData is ", decodedData);
    if (decodedData) {
      req.userId = decodedData.id;
    }
  }
  next();
};

module.exports = authMiddleware;
