const mongoose = require('mongoose');
const Joi = require('joi');
// const {Events} = require('../modules/events')


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
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        default:null
    }],
    C_OTP:{
        type:String,
        default:null
    },
    C_color:{
        type:JSON,
        color_0:{
            type:Number,
            validate:{
                validator:function(v){
                    return v>=0 && v<=5;
                },
                message:'Code number should be in between 0 to 5 inclusive.'
            },
            require:true        
        },
        color_1:{
            type:Number,
            validate:{
                validator:function(v){
                    return v>=0 && v<=5;
                },
                message:'Code number should be in between 0 to 5 inclusive.'
            },
            require:true    
        },
        color_2:{
            type:Number,
            validate:{
                validator:function(v){
                    return v>=0 && v<=5;
                },
                message:'Code number should be in between 0 to 5 inclusive.'
            },
            require:true    
        },
        color_3:{
            type:Number,
            validate:{
                validator:function(v){
                    return v>=0 && v<=5;
                },
                message:'Code number should be in between 0 to 5 inclusive.'
            },
            require:true    
        },
        color_4:{
            type:Number,
            validate:{
                validator:function(v){
                    return v>=0 && v<=5;
                },
                message:'Code number should be in between 0 to 5 inclusive.'
            },
            require:true    
        },
        color_5:{
            type:Number,
            validate:{
                validator:function(v){
                    return v>=0 && v<=5;
                },
                message:'Code number should be in between 0 to 5 inclusive.'
            },
            require:true    
        }
    },
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
