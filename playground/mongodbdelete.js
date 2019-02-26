// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client)=>{ //te conectas al server
    if(err){
        return console.log('Unabke to connect to database');
    }
    console.log('Connected to databse');
    const db = client.db('TodoApp');

//    //deleteMany
//     db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result)=>{
//         console.log(result);
//     });


    // //deleteOne
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result)=>{
    //     console.log(result);
    // });


    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
        console.log(result);
    });

    // client.close()//cierra la coneccion
});

 