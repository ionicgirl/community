const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        // const token = req.headers.Authorization.split(" ")[1];
        // console.log("Token",token);        
        const decoded = jwt.verify(req.body.token, process.env.JWT_PRIVATEKEY);
        console.log(decoded);  
        req.UserData = decoded
        next();
    }
    catch(error) {
        return res.status(401).json({
            message:' Authentication Failed',
            Error: error 
        });
    }
};