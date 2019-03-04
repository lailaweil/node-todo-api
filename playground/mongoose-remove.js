const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users');


//elimina todos los to dos
// Todo.remove({}).then(()=>{
//     console.log(result);
// });

// Todo.findOneAndRemove({_id:'5c79b6ed64ea30239ccb60f3'}).then();
// 

Todo.findByIdAndRemove('5c79b6ed64ea30239ccb60f3').then((todo)=>{
    if(!todo) return console.log('no id founf');
    console.log(todo);
}).catch((err)=>{
    console.log('id invalid');
});
