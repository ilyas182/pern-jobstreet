const pool = require('../config/db')

async function create(req,res) {
    try {
        // Step 1: destructure req.body 
        const { name, email, password } = req.body;
        // Step 2: check if user exist (if user exist then throw error)
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        res.json(user.rows)
        // Step 3: bcrypt user password

        // Step 4: enter the new user inside our database

        // Step 5: generate jwt
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}

module.exports = { create };