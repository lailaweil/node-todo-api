const express = require('express');
const _ = require('lodash');
const bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {authenticate} = require('./middleware/authenticate');
const {mongoose} = require ('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000

app.use(bodyparser.json());

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);




app.post('/todos',authenticate,(req, res)=>{
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',authenticate,(req,res)=>{
    Todo.find({
        _creator: req.user._id
    }).then((todos)=>{
        res.send({todos});
    },(err)=>{
        res.status(400).send(err);
    });
});


app.get('/todos/:id', authenticate,(req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todo.findOne({
        _creator: req.user._creator,
        _id: id
    }).then((todo)=>{
        if(!todo) res.status(404).send();
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send();
    });


});

app.delete('/todos/:id',authenticate, (req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todo.findOneAndDelete({
        _creator: req.user._id,
        _id: id
    }).then((todo)=>{
        if(!todo) res.status(404).send();
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req,res)=>{
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

    Todo.findOneAndUpdate({
        _creator: req.user._id,
        _id: id
    }, {$set: body}, {new: true}).then((todo)=>{
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
                user.generateAuthToken((token)=>{
                res.header('authorization',token);
                res.send('Sign up existoso!');
                // res.sendFile('html/users.html', {root: __dirname });
            });            
        }
    });
});

app.get('/users/me',authenticate, (req, res) =>{
    res.send(`Bienvenido ${req.user.email}`);
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
                    user.generateAuthToken((token)=>{
                        res.header('authorization',token);
                        res.send('Log in existoso!');
                    });         
                }else if(err){
                    res.send('Oops! Hubo un problema!');
                }else{
                    res.send('Contraseña incorecta');
                }
            });
        }
    });
});

app.delete('/users/me/token',authenticate, (req,res) =>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send('Chau!');
    },()=>{
        res.status(400).send('Oops no se pudo salir de la cuenta!');
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

