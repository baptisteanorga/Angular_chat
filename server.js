/*
Imports and configuration
*/
  //=> Extern dependencies
const express = require('express');
const http = require('http').Server(express);
const io = require('socket.io')(http);



//DB
// j'ai essayé pouchDB mais devant l'absence de groupe et de temps, j'ai échoué...
//Requiring the package
var PouchDB = require('PouchDB');

var db = new PouchDB('http://127.0.0.1:5984/chatdb/e20915ca22c11ba95e0e1fa779000338');
db.info().then(function (info) {
    console.log(info.name +': '+info.message);
})



io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    //
    socket.on('message', (message) => {
        
        io.emit('message', {text: message});    
    });

   
});

// Initialize our websocket server on port 5000
http.listen(3000, () => {
    console.log('started on port 3000');
});
