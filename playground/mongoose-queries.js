const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users');

// var id = '6c799b3f22145f0f108b9cf211';

// ObjectID.isValid

var userID = '5c78321779dec011ac4081a3';

if(!ObjectID.isValid(userID)){
    console.log('user id not valid');
}

User.findById(userID).then((user)=>{
    if(!user) return console.log('User not found');
    console.log(user);
},(err)=>{
    console.log(err.message)
});

// Todo.find({ //te devuelve un array de docs
//     _id: id //mongoose se encarga de pasar el string a objectID
// }).then((todos)=>{
//     console.log(todos);
// });

// Todo.findOne({ //devuelve solo un doc
//     _id: id //mongoose se encarga de pasar el string a objectID
// }).then((todo)=>{
//     if(!todo) return console.log('id not found'); //si no encuentra id
//     console.log(todo);
// }, (err)=>{
//     console.log('not found'); //si Id invalid
//     console.log(err.message);
// });

// Todo.findById(id).then((todo)=>{ //mas simple para id
//     if(!todo) return console.log('id not found');
//     console.log(todo);
// });

