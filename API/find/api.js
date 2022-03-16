"use strict";
exports.__esModule = true;
var io = require("socket.io");
var sock = io();
var PORT = 7000;
var connect = [];
var session_list = [];
function createid(text) {
    if (text === void 0) { text = ''; }
    var symbols = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    for (var i = 0; i < 6; i++)
        text += symbols[Math.floor(Math.random() * Math.floor(62))];
    return text;
}
sock.on('connection', function (socket) {
    var SocID = socket.id;
    // First init
    connect.push(SocID);
    console.log('new connect');
    socket.on('find collocutor', function (pref, callback) {
        // socket.emit('submit online', connect.length)
        if (2 <= connect.length) {
            var SesID = 'asdfwe';
            for (var i = 0; i < 2; i++)
                socket.to(connect[i]).emit('found', SesID);
        }
        else
            callback({ status: 0 });
        // callback({ status: 1 })
    });
    socket.on('join to session', function (SesID) { return socket.join(SesID); });
    socket.on('submit', function (data) {
        socket.to(data.ses).emit('get', data.msg);
        console.log('submited');
    });
    socket.on('disconnect', function (socket) {
        connect.splice(connect.indexOf(SocID), 1);
        console.log(' USER DISCONNECT ');
        console.log(connect);
    });
});
sock.listen(PORT, console.log(">  Choicer - API run on Ip: localhost:" + PORT + " "));
