const express = require('express');
const router = express.Router();
const {Events} = require('../modules/events');
const mongoose = require('mongoose');


router.post('/signup',async (req,res)=>{
    let event = new Events({
        _id : mongoose.Types.ObjectId(),
        C_id: req.body.C_id,
        E_name: req.body.E_name,
        E_location: req.body.E_location,
        // E_hostid:req.body.E_host,
        E_emailid: req.body.E_emailid,
        // E_details:req.body.E_details,
        // E_date:req.body.E_date,
        // E_time:req.body.E_time,
        // E_contactno:req.body.E_contactno,
        // E_attendee:req.body.E_attendee,
        // E_paid:req.body.C_paid
    });
    await event.save()
    .then(result=>{
        res.status(201).send(result)
        // successfully added
    })
    .catch(error=>
        {res.status(500).json({Error : error})
    });      
});

router.get('/',async (req,res)=>{
    await Events.find()
    .populate('C_id')
    .exec()
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(error=>
        {res.status(500).json({Error : error})
    });   
});

router.patch('/:id',async(req,res)=>{
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    const event = await Events.update({_id:id},{$set : updateOps})
    .exec()
    .then(result=>{
        // console.log(result);
        res.status(202).send(result);        
    }).catch(error=>{
        // console.log(error);
        res.status(500).json({Error:error});
    });

    res.send(event);
 });

router.delete('/delete/:id',async(req,res)=>{
    await Events.findByIdAndRemove(req.params.id)
    .exec()
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(error=>
        {res.status(500).json({Error : error})
    });   
})

module.exports = router;