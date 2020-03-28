const express = require('express');
const router = express.Router();
const {Users,pwd} = require('../modules/users');
// const bcrypt = require('bcrypt');

// login page
router.post('/login',async (req,res)=>{
    await Users.findOne({emailid:{$eq:req.body.emailid}})
    .exec()
    .then(result=>{
        
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        })
    });
    
});

module.exports = router;