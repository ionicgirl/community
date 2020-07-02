const mongoose = require('mongoose');


const EventsSchema = new mongoose.Schema({
    C_id: {
        type :mongoose.Schema.Types.ObjectId,
        ref:'Communities',
        required:true
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
        required:true
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
    is_limited_slots:{
            slots:{ 
                type:Number,
                default:0,
                required:true
            },
            count:{
                type:Number,
                default:1,
               
            }
    },
    E_attendee:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Users',
         default:null
         }],
    // E_paid:{
    //     type:Boolean,
    //     required:true
    // },
   
});

const Events = mongoose.model('Events', EventsSchema);

exports.EventsSchema = EventsSchema;
exports.Events = Events;