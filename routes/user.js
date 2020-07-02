const express = require('express');
const router = express.Router();
const {Users,pwd} = require('../modules/users');
const {Communities} = require('../modules/communities');
const AuthenticateUser = require('../middle-ware/check_auth');
const JWT = require('jsonwebtoken');

// singup page
router.post('/signup',async (req,res)=>{
    console.log(req.body.color);  

    await Users.findOne({emailid:req.body.emailid})
    .exec((err,result)=>{
        if(result){
            console.log(result);            
           return res.status(409).json({error:{message:'User already exist!!!'}});
        }
        if(err)
        {
            return res.status(500).json({
                        error: err,
                        message:'this login error'
            });
        }
        else{
            let user = new Users({
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
                },
                U_interests:req.body.U_interests
             });
            user.save()
            .then(async(succ)=>{
                await Admin.findOne({_id:req.body.admin})
                .then(async(resss)=>{
                    var users = user._id;
                    console.log(users);
                    
                     await Admin.updateOne({Admin_name: req.body.Admin_name}, {$push: {users: users}})
                     .exec((eor,relt)=>{
                         if(relt)
                         {
                            console.log('user added to admin side!!',relt);
                             
                         }
                         if(eor)
                         {
                            console.log('user not added to admin side!!');
                             
                         }
                 })
                })
                 const token = JWT.sign({_id:user._id,emailid:user.emailid},process.env.JWT_PRIVATEKEY,{ expiresIn:"7d"});
                res.header('x-auth-token',token).status(200).json({
                            message:'User created successfully..',
                            Result:user
                });
            })
            .catch(async(Fail)=>{
                 res.status(500).json({
                         Error : Fail
                 });
             });               
        }
    });
});
// get all user
router.post('/homepage_user',AuthenticateUser,async (req,res)=>{
    await Users.findOne({emailid:{$eq:req.body.emailid}})
    .exec(async(error,result)=>{
        if(error)
        {
            return res.status(500).json({
                message : 'user not found',
                error : error
            })
        }
        if(result==[]||result==null)
        {
            return res.status(500).json({
                message : 'user not found',
            })
        }
        if(result)
        {
            await Communities.find({C_interests:{$elemMatch:{$nin:result.U_interests}}}).select('E_id C_name').populate('E_id').exec((err,succ)=>{
                if(err)
                {
                    return res.status(500).json({
                        message : 'interest not found',
                        error : err
                    })
                }
                if(succ==[]||succ==null)
                {
                    return res.status(500).json({
                        message : 'interest not found',
                    })
                } 
                else
                {
                    return res.status(200).json({
                        message:'information found',
                        Result:succ
                    });  
                }
            })
             
        } 
    })
   
    
    
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