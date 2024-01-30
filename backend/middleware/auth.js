const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{

   try{
    const token = req.header('x-auth');

    if(!token){
        return res.status(401).json({msg:"No authentication"})
    }
    let verify = jwt.verify(token, "#123");
    if(!verify){
        return res.status(401).json({msg:"Token verification faild"})
    }

   console.log(verify)
    req.user = verify.id
    next();
   }
   catch(err){
    console.log("err",err);
    return res.status(500).json(err);
   }
}

module.exports = auth;