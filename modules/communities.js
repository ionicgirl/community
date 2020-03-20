const mongoose = require('mongoose');
const Joi = require('joi');
const {userSchema} = require('./users');

const Communities = mongoose.model('Communities',new mongoose.Schema({
    C_location: {
        type : String,
        required: true        
    },
    C_name:{
        type:String,
        required:true
    },
    C_emailid:{
        type: String,
		required: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
    C_phone:{
        type:Number,
        required:true
    },
    // C_description:{
    //     type:String,
    //     min:10,
    //     max:100,
    //     required:true
    // },
    // C_head:{
    //     type:String,
    //     min:5,
    //     max:20,
    //     required:true
    // },
    // C_interests:{
    //     type:Array,
    //     required:true
    // },
    // C_password:{
    //     type:String,
    //     required:true
    // },
    // event id
    E_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Events',
        default:null
    }],
    followers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Users',
        default:null
    }
    // // attendee_ids:{
// 
    // },
    // A_id:{
    //     type: userSchema,
    // }
    
}));

function validatecommunity(community) {
    const schema = {
      C_name :  Joi.string().min(5).max(50).required,
      C_emailid : Joi.string().regex(/^.+@.+\\..+$/).required,
      C_password : Joi.string().min(8).max(16).required,
      C_phone : Joi.number().positive().integer().required,
    };
    return validatecommunity(community,schema);
    
}

exports.Communities = Communities;
exports.validatecommunity = validatecommunity;
