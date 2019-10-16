const mongoose = require('mongoose');

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
        type:String,
        required:true
    },
    C_description:{
        type:String,
        required:true
    },
    C_head:{
        type:String,
        required:true
    },
    C_interests:{
        type:Array,
        required:true
    },
    C_password:{
        type:String,
        required:true
    },
    E_id:{
        type:Array,
        required:true
    },
    
}));

exports.Communities = Communities;
