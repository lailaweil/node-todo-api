const express = require('express');
const _ = require('lodash');
const bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var {mongoose} = require ('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000

app.use(bodyparser.json());

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);




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

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todo.findByIdAndDelete(id).then((todo)=>{
        if(!todo) res.status(404).send();
        res.send(todo);
        console.log(todo);
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text', 'completed']); //user no puede update el completedAt

    if(!ObjectID.isValid(id)) return res.status(404).send();
 
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
        if(!todo) res.status(404).send();
        res.send({todo});
    }).catch((err)=>{
        res.status(400).send();
    });
});

app.post('/users',(req,res) => {
    
    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, token) =>{
        if(err){
            res.status(400).send(err);
        }else{
            res.send(user.generateAuthToken());
        }
    });
});

app.get('/users/me', (req, res) =>{
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
                if(!user) res.send('User no encontrado!!');
                res.send({
                    message: `Bienvenido ${user.email}`
                  });
            }).catch((err)=>{
                res.send('user inválido');
            });
        }
      });
    // res.send('congratulations');
});
//POST /user/login 
app.post('/users/login', (req, res)=>{
    User.findOne({
        email: req.body.email
    },(err, user)=>{
        if(!user){
            res.send('El usuario no esta registrado.');
        }else if (err){
            res.status(400).send();
        }else {
            bcrypt.compare(req.body.password,user.password, (err,completed)=>{
                if(completed){
                    res.send(user.generateAuthToken());
                }else if(err){
                    res.send('Oops! Hubo un problema!');
                }else{
                    res.send('Contraseña incorecta');
                }
            });
        }
    });
});



app.use((err,req,res,next)=>{
    if( err.name === 'UnauthorizedError'){
        res.status(500).send(err.message);
    }
});

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

