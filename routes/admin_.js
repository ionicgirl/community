const express = require('express');
const router = express.Router();
const {Admin} = require('../modules/Admin');
const {Users} = require('../modules/Users');
const {Communities} = require('../modules/communities');
const mongoose = require('mongoose');


router.post('/signup',async (req,res)=>{
    let admin = new Admin({
        _id : mongoose.Types.ObjectId(),
        communities: req.body.communities,
        users: req.body.users,
      });
    await admin.save()
    .then(result=>{
        res.status(201).send(result)
        // successfully added
    })
    .catch(error=>
        {res.status(500).json({Error : error})
    });      
});

router.get('/users',async (req,res)=>{
    await Users.find()
    .populate('communitiess')
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