// const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {Users,pwd} = require('../modules/users');
const {Communities} = require('../modules/communities');

// singup page
router.post('/signup',async (req,res)=>{
    // console.log(req.body.color);  

    await Users.findOne({emailid:req.body.emailid})
    .exec()
    .then(result=>{
        if(result){
            console.log(result);            
           return res.status(409).json({error:{message:'User already exist!!!'}})
        }
     })
     .then(ress=>{
        let user = new Users({
            // id:user.lenght + 1,
            f_name:req.body.f_name,
            l_name:req.body.l_name,
            emailid: req.body.emailid,
            color:{
                color_0 :req.body.color.color_0,
                color_1 :req.body.color.color_1,
                color_2 :req.body.color.color_2,
                color_3 :req.body.color.color_3,
                color_4 :req.body.color.color_4,
                color_5 :req.body.color.color_5,
            }
         });
        user.save();
    })
    .then(()=>{
        res.status(200).json({
            message:'User created successfully..',
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });       
    
});

// get all user
router.post('/',async (req,res)=>{
    await Users.find()
    .exec()
    .then(result=>{
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        })
    });
    
});

// login page
router.post('/login',async (req,res)=>{
    const result = await Users.findOne({_id:{$eq:req.body._id}})
    .exec()
    .then(result=>{
        var colors = result;
        // console.log(colors.color);
        const otp = pwd(colors.color);
        Users.updateOne({emailid:req.body.emailid},{$set:{OTP:otp}}).exec();
        console.log(result);        
         res.status(200).json({
            message: result,
            O_T_P: otp
        });
    })
    .catch(err=>{
        res.status(500).json({
            message : 'user not found',
            error : err
        })
    });
   
});

// update user
router.patch('/:id',async(req,res)=>{
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    const user = await Users.update({_id:id},{$set : updateOps})
    .exec()
    .then(result=>{
        // console.log(result);
        res.status(202).send(result);        
    }).catch(error=>{
        // console.log(error);
        res.status(500).json({Error:error});
    });

    res.send(user);
 });

// delete user
router.delete('/:id',async(req,res)=>{
    await Users.findByIdAndRemove(req.params.id)
    .exec()
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        })
    });
    
});



// ================================#####FUNCTION#####===============================================================


module.exports = router;