const mongoose = require('mongoose');

const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  token:{
    type: String,      
  }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){
      
        bcrypt.genSalt(10, function (err, salt){
            bcrypt.hash(user.password, salt, function(err,hash) {
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function (callback) {
  var user = this;
  var token = jwt.sign({_id: user._id}, 'abc123',{
    expiresIn: 60 * 60 * 24 // expires in 24 hours
 }).toString();

    User.findByIdAndUpdate(user._id,{
        token: token
    }).then((user)=>{
        callback(token);
    }).catch((e) =>{
        res.status(400).send();
    });
};


UserSchema.methods.removeToken = function(token) {
    let user = this;

    return user.updateOne({
            token: null
    });
};


var User = mongoose.model('User', UserSchema);

module.exports = {User}
