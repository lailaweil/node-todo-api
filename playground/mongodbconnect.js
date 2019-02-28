// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//RESTRUCTURACION DE OBJETOS
// var user = {name:'andrew', age:25};
// var {name} = user;
// console.log(name);


// var obj = new ObjectID();

// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client)=>{ //te conectas al server
    if(err){
        return console.log('Unabke to connect to database');
    }
    console.log('Connected to databse');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false

    // },(err, result)=>{
    //     if(err){
    //         return console.log('unable to insert to do.', err);
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2)); //results.ops tiene todo slos docs que fueron insertados
    // });

    // db.collection('Users').insertOne({
    //     name: 'Laila Weil',
    //     age: 22,
    //     location: 'Buenos Aires'
    // },(err,result) =>{
    //     if(err){
    //         return console.log('Unable to insert doc.',err);
    //     }
    //     console.log(JSON.stringify(result.ops[0], undefined,2));
    //     console.log('Timestamp', result.ops[0]._id.getTimestamp());
    // });

    client.close()//cierra la coneccion
});

 