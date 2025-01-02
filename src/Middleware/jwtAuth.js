const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
  
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not found, access denied' });
  }
  
  jwt.verify(token, "secretkey", (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    next();
  });
};

module.exports = jwtAuth;
