const pool = require('../config/db')

async function authorize(req, res){
    try {
        // req.user is holding the payload
        // res.json(req.user);

        const user = await pool.query("SELECT name FROM users WHERE id=$1", [req.user]);
        res.json(user.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(403).json("Not authorized");
    }
}

module.exports = { authorize }