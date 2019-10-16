const express = require('express');
const router = express.Router();
const {Users,Validate,pwd} = require('../modules/users');

// singup page
router.post('/signup',async (req,res)=>{
    // const {error} = await Validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message)
    let user = new Users({
        // id:user.lenght + 1,
        f_name:req.body.f_name,
        l_name:req.body.l_name,
        emailid: req.body.emailid,
        password:req.body.password,
    });
    user = await user.save();
    res.send(user);
});

// get all user
router.get('/',async (req,res)=>{
    const users = await Users.find();
    res.send(users);
});

// login page
router.get('/login',async (req,res)=>{
    const user = await Users.findOne({emailid:{$eq:req.body.emailid}});
    if(!user) return res.status(404).send('user not present');
    else res.status(200).send(user);
});

// update user
router.put('/:id',async(req,res)=>{
    const user = await Users.findByIdAndUpdate(req.params.id,{emailid:req.body.emailid},{new:true});
    if(!user) return res.status(404).send('the user with given id not found....');
    res.send(user);
});

// delete user
router.delete('/:id',async(req,res)=>{
    const user = await Users.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).send('the user with given id not found....');
    res.send(user);

});



module.exports = router;