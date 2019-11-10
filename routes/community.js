const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const multer = require('multer');
const {Communities} = require('../modules/communities');
// const upload = multer({dest:'uploads/'});

router.post('/signup',async (req,res)=>{
    bcrypt.hash(req.body.C_password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error: err,
            })
        }
        else{
            const community = {
                C_location:req.body.C_location,
                C_name:req.body.C_name,
                C_emailid : req.body.C_emailid,
                C_description:req.body.C_details,
                C_head:req.body.C_head,
                C_interests:[req.body.C_interests],
                C_password:hash
            };
            const result = Community.insertMany(community);
            res.send(result);
            // .save()
            // .then()
            // .catch(err=>{
            //     console.log(err);
            //     res.status(500).json({
            //         error:err
            //     })
                
            // })
            // const result = Communities.insertMany(community);
            // res.send(result);  

        }
    })
    // console.log(req.file);
    // upload.single('C_profile_image') , 
      
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

router.patch('/:id',async(req,res)=>{
    // const id = req.params.id;
    const updateOpt = {};
    for(const ops of req.body){
        updateOpt[ops.proname] = ops.value;
    }
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