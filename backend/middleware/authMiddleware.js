const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.user.id);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Token no es válido' });
    }
};
