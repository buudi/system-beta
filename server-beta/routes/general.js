const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();

module.exports = router

router.get('/apartments', async (req, res)=>{
    try {
        const { rows } = await db.query('SELECT * FROM main_apartments');
        if(rows.length > 0) {
            res.json(rows);
        }else {
            console.log("There is no entry in /apartments");
        }
    } catch (err) {
        console.log(err.message);
    }

});

router.get('/tenants', async (req, res) => {
    try {
        const { rows } = await  db.query('SELECT * FROM tenants');
        if(rows.length > 0) {
            res.json(rows);
        } else {
            console.log('There is no entry in /tenants')
        }
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/rooms', async (req, res) => {
    try {
        const { rows } = await  db.query('SELECT * FROM rooms');
        if(rows.length > 0) {
            res.json(rows);
        } else {
            console.log('There is no entry in /rooms')
        }
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/rentPayments', async (req, res) => {
    try {
        const { rows } = await  db.query('SELECT * FROM rent_payments');
        if(rows.length > 0) {
            res.json(rows);
        } else {
            console.log('There is no entry in /rentPayments')
        }
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/expenses', async (req, res) => {
    try {
        const { rows } = await  db.query('SELECT * FROM apartment_expenses');
        if(rows.length > 0) {
            res.json(rows);
        } else {
            console.log('There is no entry in /expenses');
        }
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/contracts', async(req, res) => {
    try{
        const { rows } = await db.query('select * from contracts');
        if (rows.length > 0 ) {
            res.json(rows);
        } else {
            console.log('There is no entry in /contracts');
        }
    } catch (err) {
        console.log(err.message);
    }
})


