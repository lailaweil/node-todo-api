var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
<<<<<<< HEAD
mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
});

var Todo = mongoose.model('Todo', { //seteo de modelo para la database
    text: {
=======
mongoose.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });

var Todo = mongoose.model('Todo', { //seteo de modelo para la database
    text :{
>>>>>>> 44f4f882b5bab6880025ce942b42a82e4a847a46
        type: String
    },
    completed: {
        type: Boolean
    },
<<<<<<< HEAD
    completedAt: {
=======
    completedAt:{
>>>>>>> 44f4f882b5bab6880025ce942b42a82e4a847a46
        type: Number
    }
});

// var newTodo = new Todo({ //creo una instancia de Todo
//     text: 'Cook dinner'
// });

// //guardo
// newTodo.save().then((doc)=>{
//     console.log('Tarea guardada con éxito.');
//     console.log(doc);
// }, (e)=>{
//     console.log('No se pudo guardar la tarea.');
// });

var otherTodo = new Todo({
    text: 'otro to do',
    completed: true,
    completedAt: 2019
});

<<<<<<< HEAD
otherTodo.save().then((doc) => {
    console.log('Tarea guardada');
    console.log(JSON.stringify(doc, undefined, 2));
}, (er) => {
=======
otherTodo.save().then((doc)=>{
    console.log('Tarea guardada');
    console.log(JSON.stringify(doc,undefined,2));
},(er)=>{
>>>>>>> 44f4f882b5bab6880025ce942b42a82e4a847a46
    console.log('No se pudo agregar la tarea.');
});