const jwt = require('jsonwebtoken');
const JWT_SECRET = require("./config")
const authmiddleware = function(req, res, next){
  const authHeader =  req.headers.authorization;
  console.log(req.headers)
  if(authHeader){
    console.log("In authhgeaderf if")
    const [tokenType, token] = authHeader.split(" ");
    console.log(tokenType)
    console.log(token)
    if(tokenType == 'Bearer'){
        console.log("In if condition")
        console.log(authHeader)
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded token")
        console.log(decoded)
        if(decoded.userName != req.body.userName){
            
            res.status(403).json("Not authorized")
            return
        }
        req.userName = decoded.userName
        next();
    }
  }
  else{
    res.status(403).json("Not authorized")
    return
  }

}

module.exports = {authmiddleware};