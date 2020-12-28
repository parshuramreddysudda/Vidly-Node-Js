const  Mongoose  = require("mongoose");

module.exports=function (req,res,next) {
    if (!Mongoose.Types.ObjectId.isValid(req.params.id)) 
       return res.status(404).send('The genre with the given ID is not Valid');
    next();
}