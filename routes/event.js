const express = require('express');
const router = express.Router();
const {Events} = require('../modules/events');

router.post('/signup',async (req,res)=>{
    let event = {
        E_name:req.body.name,
        E_location:req.body.E_location,
        E_hostid:req.body.E_host,
        E_emailid:req.body.E_emailid,
        E_details:req.body.E_details,
        E_date:req.body.E_date,
        E_time:req.body.E_time,
        E_contactno:req.body.E_contactno,
        E_attendee:req.body.E_attendee,
        E_paid:req.body.C_paid
    };

    const result = await Events.insertMany(event);
    res.send(result);    
});

router.get('/event/:id',async (req,res)=>{
    let result = await Events.findById(req.params.id);
    res.send(result);
});

router.delete('/delete/:id',async(req,res)=>{
    const event = await Events.findByIdAndRemove(req.params.id);
    if(!event) return res.status(404).send('user with given id doesnot exist.');
    res.send(event);
})

module.exports = router;