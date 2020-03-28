const mongoose = require('mongoose');
const express = require('express');
const user = require('./routes/user');
const community = require('./routes/community');
const event = require('./routes/event');
const auth = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://localhost/app', {useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=>console.log('connection established with DB...'))
    .catch((err)=>console.error('connection failed with DB..',err));

app.use(express.json()); 
app.use('/api/users',user);  
app.use('/api/communities',community); 
app.use('/api/events',event);
app.use('/api/auth',auth);


const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`connection achieved at ${port}`)});
