var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
});

var Todo = mongoose.model('Todo', { //seteo de modelo para la database
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
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

otherTodo.save().then((doc) => {
    console.log('Tarea guardada');
    console.log(JSON.stringify(doc, undefined, 2));
}, (er) => {
    console.log('No se pudo agregar la tarea.');
});