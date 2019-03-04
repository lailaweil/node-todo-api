// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },{ useFindAndModify: false }, (err, client)=>{ //te conectas al server
    if(err){
        return console.log('Unabke to connect to database');
    }
    console.log('Connected to databse');
    const db = client.db('TodoApp');

    //findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID("5c6b12c0b7620aae079d9d0f")
    },{
        $set: {
            completed: true
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });

    // client.close()//cierra la coneccion
});

 