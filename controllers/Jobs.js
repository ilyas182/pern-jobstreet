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

async function applied(req, res){
    const { id } = req.params;
    try {
        const appliedJobs = await pool.query("SELECT * FROM applicants WHERE job_id = ($1)",
        [id]);
        res.json(appliedJobs.rows);
    } catch (error) {
        console.error(error.message)
    }
}

async function bookmarked(req, res){
    console.log(req.body)
    const { user_id } = req.body;
    try {
        const savedJobs = await pool.query("SELECT * FROM savedjobs WHERE user_id = ($1)",
        [user_id]);
        res.json(savedJobs.rows);
    } catch (error) {
        console.error(error.message)
    }
}

async function unbookmark(req, res){
    try {
        const { job_id, user_id } = req.body;
        const unbookmarked = await pool.query('DELETE FROM savedjobs WHERE job_id = $1 AND user_id = $2', [job_id, user_id]);
        res.json("Job deleted");
    } catch (error) {
        console.error(error.message);
    }
}

async function search(req, res){
    
    try {
        const  results  = req.query.q;
        // const searchTerm = `%${results}%`
        const searchTerm = `%${results}%`
        console.log("query",searchTerm)
        const searchResults = await pool.query("SELECT * FROM jobs WHERE title LIKE $1 OR description ILIKE $1", [searchTerm])
        if (searchResults.rows.length === 0) {
            res.json({Results: "No search results"})
        } else res.json(searchResults.rows);
        
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = { getAll, findByIndustry, findById, applied, bookmarked, unbookmark, search }