const JWT = require('../helper/jwt');
const User = require('../models/Users');

module.exports = {
    isValidToken : async (req, res, next)=>{
        if(!req.headers.authorization){
            return res.status(401).send({
                message: 'Unauthorize'
            })
        }
        if(req.headers.authorization.indexOf("Bearer ") > -1){
            const token = req.headers.authorization.replace("Bearer ", "");
            const verify = JWT.verify(token);
            if(verify){
                const user = await User.getUserSessionById(verify.id);
                if(user.error){
                    return res.status(401).send({
                        message: "Token expired or invalid"
                    })
                }
                res.locals.token = verify
                res.locals.user = user;
                next();
            }else{
                res.status(401).send({
                    message: "Token expired or invalid"
                })
            }
        }else{
            res.status(401).send({
                message: 'Unauthorize'
            })
        }
    }
};