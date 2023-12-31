const pool = require('../config/db')
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

async function create(req,res) {
    try {
        // Step 1: destructure req.body 
        const { name, email, password } = req.body;

        // Step 2: check if user exist (if user exist then throw error)
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length !== 0){
            return res.status(409).json({error: "User already exists"});
        }

        // Step 3: bcrypt user password
        const saltRound = parseInt(process.env.SALTROUND);
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Step 4: enter the new user inside our database
        const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword])
        console.log(newUser.rows[0]);
        // Step 5: generate jwt
        const token = jwtGenerator(newUser.rows[0].id);
        res.json({token});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}

async function login(req,res){
    try {
        // 1. destructure the req.body
        const {email, password} = req.body;
        // 2. check if user doesnt exist
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0)
        {
            return res.status(401).json({message: "Email or password is incorrect"});
        }
        // 3. check if incoming password is same as database pwd
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        console.log(validPassword);
        if (!validPassword) {
            return res.status(401).json({message: "Email or password is incorrect"});
        }

        // 4. jwt token
        const token = jwtGenerator(user.rows[0].id);
        res.json({token});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}

async function verify(req, res){
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}

async function apply(req, res){
    const {job_id, user_id, email, contact, experience, expectedPay} = req.body;
    try {
        const newApplicant = await pool.query("INSERT INTO applicants (experience, expectedPay, email, contact, job_id, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [experience, expectedPay, email, contact, job_id, user_id]);
        console.log(newApplicant.rows[0]);
        res.json({ message: "Job application submitted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}
async function save(req, res){
    const {job_id, user_id} = req.body;
    try {
        const savedJob = await pool.query("INSERT INTO savedJobs (job_id, user_id) VALUES ($1, $2)",
        [job_id, user_id]);
        res.json({ message: "Job saved" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}
async function appliedJobs(req,res){
    const {user_id} = req.body;
    try {
        const jobs = await pool.query("SELECT * from applicants WHERE user_id = ($1)", [user_id])
        res.json(jobs.rows)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = { create, login, verify, apply, save, appliedJobs };