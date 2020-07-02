const mongoose = require('mongoose');

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
        type: String,
		required: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	
    },
    password:{
        type:String,
        //  required:true,
    },
    OTP:{
        type:String,
        default: null
        //  required:true,
    },
    color:{
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
   community_w:[{
        type:mongoose.Schema.Types.ObjectId,
        ref :'Communities',
        default:null
    }],
    U_interests:{
        type:Array,
        require:true,
    },
    location:{
        type:String,
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        default:null
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        default:null
    }],
    attended_events:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Events',
        default:null
    }],
    enrolleded_events:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Events',
        default:null
    }],
}));

exports.Users = Users;

