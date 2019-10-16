const express = require('express');
const router = express.Router();
const {Communities} = require('../modules/communities');

router.post('/signup',async (req,res)=>{
    let community = {
        C_location:req.body.C_location,
        C_emailid : req.body.C_emailid,
        C_name:req.body.C_name,
        C_details:req.body.C_details,
        C_head:req.body.C_head,
        C_interests:[req.body.C_interests],
        C_password:req.body.C_password
    };

    const result = await Communities.insertMany(community);
    res.send(result);    
});

router.get('/',async (req,res)=>{
    let result = await Communities.find();
    res.send(result);
});

router.get('/login',async (req,res)=>{
    let community = await Communities.findOne({emailid:req.body.emailid});
    if(!community) return res.status(404).send(console.log('The user not exists....'));
    res.send(community);
});

router.put('/:id',async(req,res)=>{
    const community = await Communities.findByIdAndUpdate(req.params.id,{C_emailid:req.body.C_emailid});
    if(!community) return res.status(404).send('user with given id doesnot exist.');
    res.send(community);
});

router.delete('/:id',async(req,res)=>{
    const community = await Communities.findByIdAndRemove(req.params.id);
    if(!community) return res.status(404).send('user with given id doesnot exist.');
    res.send(community);
})

module.exports = router;