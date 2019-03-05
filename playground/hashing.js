const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc';

 bcrypt.genSalt(10, (errr, salt)=>{
     bcrypt.hash(password, salt, (err,hash)=>{
         console.log(hash);
     });
 });

 var hashedPassword = '$2a$10$Vr39ehdiOfa8/nPwQRhu8uAt6sGYvqwKMqI5K/ej5SnTrsgvRUWda';
 bcrypt.compare(password, hashedPassword, (err,res)=>{
     console.log(res);    
 });
// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'secrett');
// console.log(token);

// var decoded = jwt.verify(token,'secrett');
// console.log(decoded);

// var message = 'lailaweee';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('data was not changed');
// }
// else{
//     console.log('dont trust. data changed');
// }