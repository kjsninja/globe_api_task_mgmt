const jwt = require('jsonwebtoken');
const config = require('../config');
class JWT{
    // payload is a string
    // expiresIn to 5mins = 300secs
    generate(payload, expiresIn = 300){
        return jwt.sign(payload, config.TOKEN_SECRET, {
            expiresIn: expiresIn
        });
    }

    // verify the token
    verify(token){
        return jwt.verify(token, config.TOKEN_SECRET, (err, decoded)=>{
            if(err) return false;
            return decoded;
        });
    }
    
    decode(token){
      return jwt.decode(token)
    }
}

module.exports = new JWT();