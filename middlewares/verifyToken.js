import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "secretKey", async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

export const verifyAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    const userId = req.user._id;
    const paramId = req.params.id;
    if (userId.trim() === paramId.trim()) {
      next();
    } else {
      res.status(403).json("You can't access this");
    }
  });
};

export const verifyForgetPwd = (req, res, next) => {
  verifyToken(req, res, () => {
    const code = req.user.code;
    const paramCode = req.body.code;
    if (code.trim() === paramCode.trim()) {
      next();
    } else {
      res.status(403).json("Invalid code");
    }
  });
};
