// NODE JS SERVER

//COMMANDS:
// JUST SEND TO ALL OTHER CONNECTIONS
//socket.broadcast.emit('msg', data);
// SEND TO ALL CONNECTIONS
// io.sockets.emit('msg', data);
// SEND TO SPECIFIC USER
// io.sockets.to(socket.id).emit('Message', hellomsg);


// JUST TEST COMMENT

// SERVER
var express = require('express');

var app = express();

// LOCAL & HEROKU
var server = app.listen(process.env.PORT || 1337);


app.use(express.static('public'));

console.log("Server Up and Running");


// SOCKET
var socket = require('socket.io');
var io = socket(server);


// RUN FUNCTION ON NEW CONNECTION
io.sockets.on('connection', newConnection);

// CONNECTION
// RUN BY NEW CONNECTION
function newConnection(socket){

    var RoomSettings = {
        player: 0
    }

    // ROOM MANAGEMENT
    // ENTER ROOM
    socket.on('room', function(room) {

        console.log(room);

        // JOIN ROOM
        socket.join(room);

        // NUMBER PLAYERS
        var InsideRoom = io.sockets.adapter.rooms[room];
        var hellomsg = 'Hello ' + socket.id;

        // ROOMSETTINGS



        if(InsideRoom.length > 2){

            // TOO MANY
            socket.leave(room);
            console.log("Error, too many players!");
            var msg = "ROOM FULL :("
            io.sockets.to(socket.id).emit('RoomFull', msg);

        } else {

            RoomSettings.player = InsideRoom.length;

            io.sockets.to(socket.id).emit('Message', hellomsg);
            io.sockets.in(room).emit('RoomSettings', RoomSettings);

        }

        // SEND CONTROL MESSAGE
        var msg = "Entered Room: " + room + "With Players: " +  InsideRoom.length;
        io.sockets.in(room).emit('Message', msg);


        // RUN FUNCTION ON LOST CONNECTION
        socket.on('disconnect', function () {
            socket.leave(room);

            RoomSettings.player = InsideRoom.length;
            io.sockets.in(room).emit('RoomSettings', RoomSettings);

            console.log("DISCONNECTED: " + socket.id + " in Room: " + room);
        });

    });


    // NEW USER
    console.log('newUser ' + socket.id);

    // GET DATA FROM CLIENT & SEND IT TO CLIENTS
    socket.on('GameData', function(data){
        socket.broadcast.to(data.room).emit('GameData', data);
    });

    socket.on('GameDataP2',function(data){
        socket.broadcast.to(data.room).emit('GameDataP2', data);
    });

}
