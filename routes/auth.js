const express = require('express');
const router = express.Router();
const {Users} = require('../modules/users');
const {Communities} = require('../modules/communities')
const JWT = require('jsonwebtoken');

// login page
router.post('/user/login_fist_step',async (req,res)=>{

    await Users.findOne({emailid:{$eq:req.body.emailid}})
    .exec((errr,results)=>{
        if(errr)
        {
            return res.status(500).json({
                message : 'Invalid emailid or OTP ',
                error : errr
            })
        }
        if(results==[]||results==null)
        {
            return res.status(500).json({
                message : 'Invalid emailid or OTP ',
            });
        }
        if(results)
        {
            var colors = results.color;
            var a = Number(colors.color_0);
            var b = Number(colors.color_1);
            var c = Number(colors.color_2);
            var d = Number(colors.color_3);
            var e = Number(colors.color_4);
            var f = Number(colors.color_5);
            
            var pwdmatrix = new Array(6);
            for (let i = 0; i < 6; i++) {
            pwdmatrix[i] = [];
                for (let j = 0; j < 6; j++) { 
                    pwdmatrix[i][j] = Math.floor(Math.random()*((5-0)+1)+0);
                }           
            }
            let l = 0;
            var matrix = new Array();
            for ( i in pwdmatrix){
                for ( j in pwdmatrix[i]){
                    matrix[l]=pwdmatrix[i][j];
                    ++l;
                }
            }
            const O_T_P = `${pwdmatrix[a][b]}${pwdmatrix[c][d]}${pwdmatrix[e][f]}`;
            Users.updateOne({emailid:req.body.emailid},{$set:{OTP:O_T_P}}).exec((err,succ)=>{
                if(err)
                {
                    console.log('error occure while updating otp',err);                    
                }
                if(succ)
                {
                    console.log('updation successfull',succ);
                    
                }
            });
             res.status(200).json({
                AllData: results,
                Matrix:matrix,
                NewOTP:O_T_P
            });
        }
    });

      
});

router.post('/user/login_second_step',async(req,res)=>{
    await Users.findOne({$and:[{emailid:{$eq:req.body.emailid},OTP:{$eq:req.body.O_T_P}}]}).exec((err,succ)=>{
        if(err)
        {
            return res.status(500).json({
                message:'....Invalid emailid or OTP ',
                error:err
            });
        }
        if(succ)
        {
            const token = JWT.sign({_id:succ._id,emailid:succ.emailid},process.env.JWT_PRIVATEKEY,{ expiresIn:"7d"});
            return res.status(200).json({
                message:'successful',
                result:token
            });
        }
        if(succ==[]||succ==null)
        {
            return res.status(500).json({
                message:'*****Invalid emailid or OTP '
            })
        }
    });
});

router.post('/community/login_fist_step',async (req,res)=>{
    await Communities.findOne({C_emailid:{$eq:req.body.C_emailid}})
    .exec((errr,results)=>{
        if(errr)
        {
            return res.status(500).json({
                message : 'Invalid emailid or OTP ',
                error : errr
            })
        }
        if(results==[]||results==null)
        {
            return res.status(500).json({
                message : 'Invalid emailid or OTP ',
            });
        }
        if(results)
        {
            console.log('result:',results);
            var colors = results.C_color;
            var a = Number(colors.color_0);
            var b = Number(colors.color_1);
            var c = Number(colors.color_2);
            var d = Number(colors.color_3);
            var e = Number(colors.color_4);
            var f = Number(colors.color_5);
            
            var pwdmatrix = new Array(6);
            for (let i = 0; i < 6; i++) {
            pwdmatrix[i] = [];
                for (let j = 0; j < 6; j++) { 
                    pwdmatrix[i][j] = Math.floor(Math.random()*((5-0)+1)+0);
                }           
            }
            let l = 0;
            var matrix = new Array();
            for ( i in pwdmatrix){
                for ( j in pwdmatrix[i]){
                    matrix[l]=pwdmatrix[i][j];
                    ++l;
                }
            }

            const O_T_P = `${pwdmatrix[a][b]}${pwdmatrix[c][d]}${pwdmatrix[e][f]}`;

            for (i in matrix)
            {
                console.log('new matrix',matrix[i]);
            }
            Communities.updateOne({C_emailid:req.body.C_emailid},{$set:{C_OTP
                :O_T_P}}).exec((err,succ)=>{
                if(err)
                {
                    console.log('error occure while updating otp',err);                    
                }
                if(succ)
                {
                    console.log('updation successfull',succ);
                    
                }
            });
            console.log("results:===",results);        
             res.status(200).json({
                AllData: results,
                Matrix:matrix,
                NewOTP:O_T_P
            });
        }
    });
});

router.post('/community/login_second_step',async(req,res)=>{
    await Communities.findOne({$and:[{C_emailid:{$eq:req.body.C_emailid},C_OTP:{$eq:req.body.C_OTP}}]}).exec((err,succ)=>{
        if(err)
        {
            return res.status(500).json({
                message:'....Invalid emailid or OTP ',
                error:err
            });
        }
        if(succ)
        {
            // console.log('succ',succ);
            
            const token = JWT.sign({_id:succ._id,C_emailid:succ.C_emailid},process.env.JWT_PRIVATEKEY,{ expiresIn:"7d"});
            return res.status(200).json({
                message:'successful',
                result:token
            });
        }
        if(succ==[]||succ==null)
        {   
            // console.log('succ',succ);
            
            return res.status(500).json({
                message:'*****Invalid emailid or OTP '
            })
        }
    });
});




module.exports = router;