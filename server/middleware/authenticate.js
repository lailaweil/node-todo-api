var {User} = require('./../models/user');
const jwt = require('jsonwebtoken');

var authenticate = (req, res, next) =>{
    let token = req.headers['authorization'];

    if(!token){
        res.status(400).send({
            error: 'Es necesario el token de autenticación'
        });
        return;
    }
    token = token.replace('Bearer ', '');

    jwt.verify(token, 'abc123', function(err, user) {

        if (err) {
            res.status(401).send({
            error: 'Token inválido'
          });
        } else {
            User.findById(user._id).then((user)=>{
                if(!user) return res.send('Oops! User no encontrado!!');
                
                req.user = user;
                req.token = token;
                //APRENDER A PASAR USER A SERVERS.JS GET /USERS/ME
                next();
            }).catch((err)=>{
                res.send('Oops, user inválido');
            });
        }
      });
};

module.exports = {
    authenticate
};