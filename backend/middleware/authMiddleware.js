import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }
    console.log("Token:", token);
    console.log("Secret:", process.env.JWT_SECRET);
    const decoded = jwt.decode(token, { complete: true });
    console.log("Decoded JWT:", decoded);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorised User",
          errorMess: err.message,
        });
      } else {
        // Ensure req.body exists
        if (!req.body) req.body = {};
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "please provide Auth Token",
      errMessage: error.message,
    });
  }
};
