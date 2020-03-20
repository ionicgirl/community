const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Communities,validatecommunity} = require('../modules/communities');
const {Users} = require('../modules/users');
const jwt = require('jsonwebtoken')
// const multer = require('multer');
// const upload = multer({dest:'uploads/'});

router.post('/signup',async (req,res)=>{
    // const {error} = validatecommunity(req.body);
    // if (error) return res.status(400).send(error.details[0].massege);


    const community = new Communities({
                C_location:req.body.C_location,
                C_name:req.body.C_name,
                C_emailid : req.body.C_emailid,
                C_phone : req.body.C_phone,
                // C_description:req.body.C_description,
                // C_head:req.body.C_head,
                // C_interests:[req.body.C_interests],
                // C_password:req.body.C_password,
                E_id : [req.body.E_id]

            });
            // const salt = await bcrypt.genSalt(10);
            // community.C_password = await bcrypt.hash(community.C_password,salt);
            await community.save()
            .then(resultt=>{
                res.status(200).send(resultt);
            })
            .catch(error=>{
                res.status(500).json({Error : error})
            });
                    
});

// router.post('/c_event',async(req,res)=>{
//     const event = 
// });

router.post('/attendee',async (req,res)=>{
    
    const attendee = await Users.findById(req.body.A_id);
    if(!attendee) return res.status(404).send('invalid Attendee');    

});


router.get('/',async (req,res)=>{
    await Communities.find()
    .populate('E_id')
    .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({
            Error:err
        })
    });
  
});

router.get('/login',async (req,res)=>{
    
    await Communities.findOne({emailid:req.body.emailid})    
    .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({
            Error:err
        })
    });
    // if(!community) return res.status(404).send(console.log('The user not exists....'));
});

router.patch('/:id',async(req,res)=>{
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    const community = await Communities.update({_id:id},{$set : updateOps})
    .exec()
    .then(result=>{
        // console.log(result);
        res.status(202).send(result);        
    }).catch(error=>{
        // console.log(error);
        res.status(500).json({Error:error});
    });

    res.send(community);
 });

router.delete('/:id',async(req,res)=>{
    await Communities.findByIdAndRemove(req.params.id)
    .exec()
    .then(result=>{res.status(200).send(result)})
    .catch(error=>{res.status(500).json({Error : error})});
    // if(!community) return res.status(404).send('user with given id doesnot exist.');
    // res.send(community);
})

module.exports = router;