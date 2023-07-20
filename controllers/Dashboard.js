const pool = require('../config/db')

async function authorize(req, res){
    try {
        res.json(req.user);
    } catch (error) {
        console.error(error.message);
        res.status(403).json("Not authorized");
    }
}

module.exports = { authorize }