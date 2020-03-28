const express = require('express');
const router = express.Router();
const {Events} = require('../modules/events');
const {Communities} = require('../modules/communities')
const mongoose = require('mongoose');


router.post('/signup',async (req,res)=>{
    // const new_Cid = req.body.C_id;
    // const new_ename = req.body.E_name;
    await Events.findOne({$and:[{C_id:{$eq:req.body.C_id},E_name:{$eq:req.body.E_name}}]})
    .exec((error,result)=>{
        if(result)
                return res.status(500).json({
                        error:{
                                message :'event already exist'
                            }
                })
        else
                {
                    const event = new Events({
                        _id : mongoose.Types.ObjectId(),
                        C_id: req.body.C_id,
                        E_name: req.body.E_name,
                        E_location: req.body.E_location,
                        E_emailid: req.body.E_emailid,
        
                    });
                    event.save();
                    update_event_com(event.C_id,event._id)
                    res.status(200).json({
                        message:'successfully added to Event',
                        Newevent : event
                    });
                }
    })
       
});

router.get('/',async (req,res)=>{
    await Events.find().exec()
    // .populate('C_id')
    .then(result=>{
        res.status(200).json({
            Result:result,
            messege:'found!!'
        })
    })
    .catch(error=>
        {res.status(500).json({Error : error,message:'not found!!'})
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
    const eid = req.params.id;
    await Events.findOne({_id:req.params.id}).exec((async (err,res_ult)=>{
        if(res_ult==[]||res_ult==null)
        {
            return res.status(500).json({
                message:'event not found!!'
            });
        }
        else
        {
            await Events.findByIdAndDelete({_id:req.params.id})
            .exec((e_rr,r_esult)=>{
                if(r_esult)
                {   const cid = r_esult.C_id;
                    console.log('cid:',cid,'eid:',eid);
                    del_event_com(cid,eid);
                    res.status(200).json({
                        message:'Event deleted successfully!!'
                    })
                }
                if(e_rr)
                {
                    res.status(500).json({
                        Error : e_rr,
                        message:'Error occured while deleting'
                    })
                }
            })             
        }        
        if(err)
        {
            return res.status(500).json({
                message:'Error occur',
                Error:err
            });
        }
        
    }));
   
});



// ==========================#####FUNCTION#####=======================================================================


async function update_event_com(x,y) {
    console.log('in function',x,'....',y);
    try {
        const result = await Communities.updateOne({_id :x},{$push: {E_id: y}}).exec();
        console.log('event added to community',result); 
    } catch (error) {
        console.log('event can not added to community',error);        
    }   
   
}

async function del_event_com(c,e) {
        await Communities.updateOne({_id:c},{$pull:{E_id:e}})
            .exec((error,result)=>{
                if(result)
                {
                    return console.log('event remove from community',result);
                }
                if(error)
                {
                    return console.log('event can not remove from community',error);
                }
            })
       
}

module.exports = router;

            // E_hostid:req.body.E_host,
            // E_details:req.body.E_details,
            // E_date:req.body.E_date,
            // E_time:req.body.E_time,
            // E_contactno:req.body.E_contactno,
            // E_attendee:req.body.E_attendee,
            // E_paid:req.body.C_paid

 // .then(ress=>{
           
    //     // await Communities.updateOne({_id : req.body.C_id},{$push: {E_id: New_event}})
    //     // .then(()=>{
    //     //     return res.status(201).json({
    //     //         message:'successfully added to community'
    //     //     })
    //     // }).catch((error)=>{
    //     //     return res.status(201).json({
    //     //         Error : error,
    //     //         message:'something went wrong while community update!!'
    //     //     })
    //     // })
    // })  
    
    