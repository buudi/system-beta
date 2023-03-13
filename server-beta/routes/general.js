const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();

module.exports = router

router.get('/', async (req, res)=>{
    try {
        const { rows } = await db.query('SELECT * FROM main_apartments');
        if(rows.length > 0) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
            res.json(rows);
        }else {
            console.log("there is no entry!");
        }
    } catch (err) {
        console.log(err.message);
    }

});