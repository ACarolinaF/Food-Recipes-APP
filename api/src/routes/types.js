const {Router} = require('express');
const router = Router();
const axios = require('axios');
const {Diet} = require('../db');

router.get('/', async(req, res, next)=>{
    try {

        let diet_types = await Diet.findAll();
        res.json(diet_types);
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;