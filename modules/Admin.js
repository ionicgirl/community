const mongoose = require('mongoose');

const Admin = mongoose.model('Admin',new mongoose.Schema({
     // event id
    Admin_name:{
        type:String,
        required:true
    },
    users:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Users',
        default:null
    },
    communities:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Communities',
        default:null
    }

}));

exports.Admin = Admin;