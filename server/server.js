var express = require('express');
var bodyparser = require('body-parser');


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


var port = 3000;

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});