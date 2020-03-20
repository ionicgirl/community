const mongoose = require('mongoose');

const Admin = mongoose.model('admin',new mongoose.Schema({
     // event id
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