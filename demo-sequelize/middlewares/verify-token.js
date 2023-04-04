const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken(req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
      // Handle token presented as a Bearer token in the Authorization header
      token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      // Handle token presented as URI param
      token = req.query.token;
    } else if (req.cookies && req.cookies.token) {
      // Handle token presented as a cookie parameter
      token = req.cookies.token;
    }

    if (!token)
      return res.status(404).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, "secret1234", function (err, decoded) {
      if (err)
        return res.status(404).send({ auth: false, message: 'Failed to authenticate token.' });
      // if everything good, save to request for use in other routes
      req.user = decoded;
      next();
    });
  },

}