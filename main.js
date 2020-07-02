const mongoose = require('mongoose');
const express = require('express');
const user = require('./routes/user');
const community = require('./routes/community');
const event = require('./routes/event');
const auth = require('./routes/auth');
const admin = require('./routes/admin')
const morgan = require('morgan');
const bodyParser = require('body-parser');

const CORS = require('cors');

const app = express();
app.use(express.json()); 

require('dotenv').config();

mongoose.connect('mongodb://localhost/app', { useNewUrlParser: true , useUnifiedTopology: true })
    .then(()=>console.log('connection established with DB...'))
    .catch((err)=>console.error('connection failed with DB..',err));
mongoose.set('useFindAndModify',false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers","Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept Access-Control-Allow-Request-Method");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
            next();
   });
app.use(morgan('dev'));



// ROUTERS
app.use('/api/users',user);  
app.use('/api/communities',community); 
app.use('/api/events',event);
app.use('/api/auth',auth);
app.use('/api/admin',admin);


const port = process.env.PORT || 5000;
app.listen(port,()=>{console.log(`connection achieved at ${port}`)});

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message,
            E_Status : error.status
        }
    });
});

//     res.set('Access-Control-Allow-Origin', '*');
//     res.set(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     if (req.method === 'OPTIONS') {
//         res.set('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
//         return res.status(200).json({});
//     }
//     next();
// var corsOptions = {
//     origin: function (origin, callback) {
//       // db.loadOrigins is an example call to load
//       // a list of origins from a backing database
//       db.loadOrigins(function (error, origins) {
//         callback(error, origins)
//       })
//     }
//   }

// app.use(CORS());