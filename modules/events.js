const mongoose = require('mongoose');

const Events = mongoose.model('Events',new mongoose.Schema({
    C_id: {
        type :mongoose.Schema.Types.ObjectId,
        ref:'Communities',
    },
    E_name: {
        type : String,
        required: true        
    },
    E_location: {
        type : String,
        required: true        
    },
    // E_hostid:{
    //     type:String,
    //     required:true
    // },
    E_emailid:{
        type:String,
    },
    // E_details:{
    //     type:String,
    //     required:true
    // },
    // E_date:{
    //     type:String,
    //     required:true
    // },
    // E_time:{
    //     type:String,
    //     required:true
    // },
    // E_contactno:{
    //     type:String,
       
    // },
    // E_attendee:{
    //     type:[mongoose.Schema.Types.ObjectId],
        // ref:'Users',
        // default:null
    // },
    // E_paid:{
    //     type:Boolean,
    //     required:true
    // },
    // E_status:{
    //     type:Boolean,
    //     required:true
    // },
}));

exports.Events = Events;