const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, rs, next) => {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) {
            return res.status(403).json("Not authorized");
        }

        const payload = jwt.verify(jwtToken, process.env.SECRET);
        req.user = payload.user;
    } catch (error) {
        console.error(error.message);
        return res.status(403).json("Not authorized");
    }
}