const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
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
   community_w:{
        type:[mongoose.Schema.Types.ObjectId],
        ref :'Communities',
        default:null
    },
    interests:{
        type:String,
        // require:true,
    },
    location:{
        type:String,
    },
    followers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Users',
        default:null
    },
    following:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Users',
        default:null
    }
    // photo:{
    //     type:String
    // }
});

const Users = mongoose.model('User',userSchema)


function pwd(x){
    // console.log("passwd",x);
    var a = Number(x.color_0);
    var b = Number(x.color_1);
    var c = Number(x.color_2);
    var d = Number(x.color_3);
    var e = Number(x.color_4);
    var f = Number(x.color_5);
    //  console.log('no. : ',a,b,c,d,e,f);

    var pwdmatrix = new Array(6);
    for (let i = 0; i < 6; i++) {
            pwdmatrix[i] = [];
            for (let j = 0; j < 6; j++) {
                 pwdmatrix[i][j] = Math.floor(Math.random()*((5-0)+1)+0);
            }
            // System.out.print("\n");
    }

    //    console.log('final password:'+pwdmatrix[a][b]+pwdmatrix[c][d]+pwdmatrix[e][f]);
       const O_T_P = `${pwdmatrix[a][b]}${pwdmatrix[c][d]}${pwdmatrix[e][f]}`;
    //    console.log(O_T_P);
       return O_T_P;
    // }
    // return (pwdmatrix[a][b]+pwdmatrix[c][d]+pwdmatrix[e][f]);
}


exports.userSchema = userSchema;
exports.Users = Users;
exports.pwd = pwd;
