var express = require('express');
var bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require ('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/users');


var app = express();

app.use(bodyparser.json());

app.post('/todos',(req, res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(err)=>{
        res.status(400).send(err);
    });
});


app.get('/todos/:id', (req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(404).send();
    Todo.findById(id).then((todo)=>{
        if(!todo) res.status(404).send();
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send();
    });


});

var port = 3000;

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

