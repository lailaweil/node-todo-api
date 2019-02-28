// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client)=>{ //te conectas al server
    if(err){
        return console.log('Unabke to connect to database');
    }
    console.log('Connected to databse');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({_id}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('unable to fetch todos', err);
    // });
    db.collection('Users').find({name:'Laila Weil'}).count().then((count)=>{
        console.log('Todos count:');
        console.log(JSON.stringify(count,undefined,2));
    },(err)=>{
        console.log('unable to fetch todos', err);
    });
    // client.close()//cierra la coneccion
});

 