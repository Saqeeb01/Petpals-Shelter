// const jwt = require('jsonwebtoken');
// const secretKey = '0486f1ad645f58c319765aaf78124b141e4725e206cadbd6a8f38552e71ecee3'; // Replace with your actual secret key

// const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token not provided' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     req.user = decoded;
//     next();
//   });
// };

// module.exports = { authenticateToken };
