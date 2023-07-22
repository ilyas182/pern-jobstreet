const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

async function create(req, res) {
    try {
         // Step 1: destructure req.body 
         const { contact_name, contact, email, password, businessName } = req.body;

         // Step 2: check if user exist (if user exist then throw error)
         const employer = await pool.query("SELECT * FROM employers WHERE email = $1", [email]);
         if (employer.rows.length !== 0){
             res.status(401).send("User already exists");
         }
 
         // Step 3: bcrypt user password
         const saltRound = parseInt(process.env.SALTROUND);
         const salt = await bcrypt.genSalt(saltRound);
         const bcryptPassword = await bcrypt.hash(password, salt);
 
         // Step 4: enter the new user inside our database
         const newEmployer = await pool.query("INSERT INTO employers (contact_name, contact, email, password, businessName) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [contact_name, contact, email, bcryptPassword, businessName])
         console.log(newEmployer.rows[0]);
         // Step 5: generate jwt
         const token = jwtGenerator(newEmployer.rows[0].id);
         res.json({token});
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

async function login(req,res){
    try {
        // 1. destructure the req.body
        const {email, password} = req.body;
        // 2. check if user doesnt exist
        const employer = await pool.query("SELECT * FROM employers WHERE email = $1", [email]);

        if (employer.rows[0].length === 0)
        {
            res.status(401).json("Email or password is incorrect");
        }
        // 3. check if incoming password is same as database pwd
        const validPassword = await bcrypt.compare(password, employer.rows[0].password);
        console.log(validPassword);
        if (!validPassword) {
            return res.status(401).json("Email or password is incorrect");
        }

        // 4. jwt token
        const token = jwtGenerator(employer.rows[0].id);
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

async function postJob(req,res){
    try {
        const {title, description, pay, industry, location, closingDate, employer_id, level} = req.body;
        const newJob = await pool.query("INSERT INTO jobs (title, description, pay, industry, location, closingDate, employer_id, level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [title, description, pay, industry, location, closingDate, employer_id, level])
        console.log(newJob.rows[0]);
        res.json(newJob.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}
module.exports = { create, login, verify, postJob }