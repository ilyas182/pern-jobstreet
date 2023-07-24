const pool = require('../config/db');


async function getAll(req,res){
    try {
        const allJobs = await pool.query("SELECT * FROM jobs");
        res.json(allJobs.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }
}

async function findByIndustry(req,res){
        const { industry } = req.params;
    try {
        const jobsInIndustry = await pool.query("SELECT * FROM jobs WHERE UPPER(industry) = UPPER($1)",
        [industry]);
        res.json(jobsInIndustry.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }
}

async function findById(req,res){
    const { id } = req.params;
    try {
        const jobById = await pool.query("SELECT * FROM jobs WHERE id = ($1)",
        [id]); 
        res.json(jobById.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }
}

module.exports = { getAll, findByIndustry, findById }