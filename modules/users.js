const mongoose = require('mongoose');
const joi = require('joi');

const Users = mongoose.model('Users',new mongoose.Schema({
    f_name: {
        type : String,
        required: true,        
    },
    l_name:{
        type:String,
        required:true,
    },
    emailid:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    // interests:{
    //     type:String,
    //     require:true,
    // },
    // location:{
    //     type:String,
    // }
    // photo:{
    //     type:String
    // }
}));


function Validate(user){
    const schema = {
        emailid : joi.string().regex('^.+@.+\\..+$')
    }
    return joi.validate(user,schema);
}


function pwd(){
    var pwdmatrix = new Array(6);
    for (let i = 0; i < 5; i++) {
            pwdmatrix[i] = [];
            for (let j = 0; j < 5; j++) {
                 pwdmatrix[i][j] = Math.floor(Math.random()*((5-0)+1)+0);
            }
            // System.out.print("\n");
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
           console.log(pwdmatrix[i][j]);
        }
        console.log("\n");
    }
    console.log('numbers:');
    
    for(let i = 0;i<5;i++){
        console.log(pwdmatrix[i][i]);
    }
}

exports.Users = Users;
exports.Validate = Validate;
exports.pwd = pwd;
