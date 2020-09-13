const express = require('express');
const router = express.Router();
const {Communities} = require('../modules/communities');
const {Users} = require('../modules/users');
const {Events} = require('../modules/events');
const {Admin} = require('../modules/Admin');
const mongoose = require('mongoose');
const AuthenticateUser = require('../middle-ware/check_auth');
const JWT = require('jsonwebtoken');
const { result } = require('lodash');



router.post('/signup',async (req,res)=>{
    await Communities.findOne({C_name:{$eq:req.body.C_name}})
    .exec((error,result)=>{
        if(error)
            {
                return res.status(500).json({
                    message:'Error occure!!',
                    Error:error
                })  
            }
        if(result)
            {
                return res.status(400).json({
                    message:'Community already exsist!!',
                    Result:result
                })
            }
        else
            {
                const community = new Communities({
                    C_location:req.body.C_location,
                    C_name:req.body.C_name,
                    C_emailid : req.body.C_emailid,
                    C_phone : req.body.C_phone,
                    C_description:req.body.C_description,
                    C_organizer:req.body.C_organizer,
                    C_interests:[req.body.C_interests],
                    C_color:{
                        color_0 :req.body.C_color.color_0,
                        color_1 :req.body.C_color.color_1,
                        color_2 :req.body.C_color.color_2,
                        color_3 :req.body.C_color.color_3,
                        color_4 :req.body.C_color.color_4,
                        color_5 :req.body.C_color.color_5,
                    },
                    C_interests:req.body.C_interests        
                });
                community.save()
                .then(async(succ)=>{
                   await Admin.findOne({_id:req.body.admin})
                   .then(async(resss)=>{
                       var communities = community._id;
                       console.log(communities);
                       
                        await Admin.updateOne({Admin_name: req.body.Admin_name}, {$push: {communities: communities}})
                        .exec((eor,relt)=>{
                            if(relt)
                            {
                                // return res.status(302).json({
                                //         Result : relt,
                                //         message: 'community added to admin side!!'
                                // })
                                console.log('community added to admin side!!',relt);
                                
                            }
                            if(eor)
                            {
                                // return res.status(400).json({
                                //         message:'community not added to admin side!!!',
                                //         Error:eor
                                // })
                                console.log('community not added to admin side!!');
                                
                            }
                    })
                   })
                    // .then(ressss=>{
                    //     console.log
                    //     res.status(201).json;({
                    //         message:'Successfully added to admin',
                    //         Result:ressss
                    //     })
                    // })
                    // .catch(errrrr=>
                    //     {
                    //        res.status(500).json({
                    //             Error : errrrr
                    //         }
                    //     );
                    // }); 
                    const token = JWT.sign({_id:community._id,C_emailid:community.C_emailid},process.env.JWT_PRIVATEKEY,{ expiresIn:"7d"});
                    res.header('x-auth-token',token).status(200).json({
                                    message :'User created successfully..',
                                    Result : community
                    });     
                })
                .catch(async(Fail)=>{
                    res.status(500).json({
                            Error : Fail
                    });
                });               
               
            }
        })
    }
);

router.post('/follower',async (req,res)=>{

    const cid = req.body.id;
    const New_user = req.body.U_id;
    await Communities.findOne({$and:[{_id:req.body.id,followers:req.body.U_id}]})
    .exec(async(Err_or,Res_ult)=>{
        if(Res_ult)
        {
            return res.json({message:'found', result:Res_ult});
        }
        else
        {
            
            await Users.findOne({_id:req.body.U_id}).exec(async (Err,Res)=>{
                if(Res == [] || Res == null)
                {
                    return res.status(500).json({
                        message:'User not found'
                    })
                }
                if(Err)
                {
                    return res.status(500).json({
                        message:'Error occur while finding user!!',
                        Error : Err
                    })
                }
                else
                {   console.log('user found');
                
                    await Communities.updateOne({_id: req.body.id}, {$push: {followers: New_user}})
                    .exec((error,result)=>{
                            if(result)
                            {
                                add_community_user(New_user,cid);
                                return res.status(302).json({
                                        Result : result,
                                        message: 'follower added!!'
                                })
                            }
                            if(error)
                            {
                                return res.status(400).json({
                                        message:'follower not added!!!',
                                        Error:error
                                })
                            }
                    })
                }
            })            
        }
        if(Err_or)   
        {
            res.status(400).json({
                message:'not found!!!',
                Error:error
            }) 
        }        
    })    
});


router.get('/:id',async (req,res)=>{
    await Communities.find({_id:req.params.id})
    .exec()
    .then(result=>{
        if(result.length)
        {
            res.status(200).json(
                { 
                    message:'found',
                    Result:result
                })
        }
        else
        {
            return res.status(500).json({
                message:'not found'
            })  
        }    
    }) 
});


router.post('/Events',async(req,res)=>{
    await Communities.findOne({_id:req.body.id})
    .populate('E_id')
    .exec((err,ans)=>{
        if(ans == [] || ans == null )
            {  
                // console.log(Resul_t.length);
                return res.status(500).json({
                    message:'community Not found!!',
                }) 
            }
        else{
            res.status(200).json(
                { 
                    message:'found',
                    Result:ans.E_id
                });
            
        }
        if(err){
            return res.status(500).json({
                message:'Error occur',
                Error:error
            });  
        }
    })
});

router.patch('/update/:id',async(req,res)=>{
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    const community = await Communities.update({_id:id},{$set : updateOps})
    .exec()
    .then(result=>{
        res.status(202).send(result);        
    }).catch(error=>{
        res.status(500).json({Error:error});
    });

    res.send(community);
 });


router.delete('/delete/:id',async(req,res)=>{
    const C_id = req.params.id;    
    await Communities.findOne({_id:{$eq:req.params.id}})
        .exec(async (Err,Resul_t)=>{
            if(Resul_t == [] || Resul_t == null )
            {  
                // console.log(Resul_t.length);
                return res.status(500).json({
                    message:'community Not found!!',
                }) 
            }
           else
            {  
                // console.log('........',Resul_t);            
                await Communities.findByIdAndDelete({_id:C_id})
                    .exec(async (error,result)=>{
                        if(result)
                            {   
                                const foll = result.followers;
                                for (let i = 0; i < foll.length; i++) {
                                        const element = foll[i];
                                        delete_comm_user(element,C_id);                                    
                                    }
                                //  }
                                events_delete(C_id); 
                                // console.log("community deleted",result);
                                return res.status(200).json({
                                    message:'***community deleted',
                                    Result:result
                                });                                 
                            }
                        if(error)
                            {   
                                return res.status(500).json({
                                    message:'***Not found!!',
                                    Error:error
                                });  
                            }
                    })
            }
            if(Err)
            {
                return res.status(500).json({
                    message:'community Not found!!',
                    Error:Err
                }) 
            }
        })
                
});

//===============================##### FUNCTIONS #####=====================================================================


async function events_delete(x) {
      try  {
          await Events.find({C_id:x}).exec(async(err,ans)=>{
            if(ans)
            {
                await Events.deleteMany({C_id:x}).exec((error,result)=>{
                    if(result)
                        {
                            console.log('##event deleted!!',result);                
                        }
                    if(error)
                        {
                            console.log(('##event not deleted!!!',error));                
                        }
                })
            }
            if(err)
            {
                console.log('##Event not found!!!',);                
            }
          })
        }
      catch(error)  {
                        console.log(('not found!!!',error)); 

        }       
}

async function add_community_user(U_id,cid) {
        console.log('cid',cid,'uid',U_id);
        
        await Users.updateOne({_id :U_id},{$push: {community_w:cid}}).exec((e_rr,re_sult)=>{
            if(re_sult)
            {
                return console.log('community added successfully!!',re_sult);
            }
            if(e_rr)
            {
                return console.log('community not added',e_rr);
            }
        })  
}

async function delete_comm_user(uid,cid){
    await Users.updateOne({_id:uid},{$pull:{community_w:cid}})
    .exec((error,result)=>{
        if(result)
        {
            return console.log('community remove from user',result);
        }
        if(error)
        {
            return console.log('community can not remove from user',error);
        }
    })

}


module.exports = router;
                // C_description:req.body.C_description,
                // C_head:req.body.C_head,
                // C_interests:[req.body.C_interests],
                // C_password:req.body.C_password,