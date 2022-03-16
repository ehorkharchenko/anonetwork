var io = require('socket.io')();
var database = require('../database.json');
var database_live = null;
var database_user = null;
var PORT = 6007;
io.on('connection', function (socket) {
    console.log(' Hello client');
    // Join service
    socket.on('free', function (data, callback) {
        callback(true);
    });
    socket.on('join', function (data, callback) {
        function idcreator(type) {
            var _a = [
                (type === 'PROFILE') ? 60 : 16,
                (type === 'PROFILE') ? true : false
            ], count = _a[0], seperator = _a[1];
            var id = '';
            var symbols = [
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B',
                'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
                'y', 'z'
            ];
            for (var i = 1; i <= count; i++) {
                id += symbols[Math.floor(Math.random() * Math.floor(62))];
                if (seperator) {
                    if ((i % 6) === 0 && i !== 60)
                        id += '_';
                }
            }
            return id;
        }
        var schema = {
            "__id": idcreator('PROFILE'),
            "user name": data['user name'],
            "user id": "001",
            "secure key": data['secure key'],
            "friends": [],
            "socialize": {
                "ban": [false, null],
                "warn": 0
            },
            "Id's": {
                "FI": idcreator('FI'),
                "AI": idcreator('AI')
            }
        };
    });
    // Data service
    // authorization
    socket.on('enter', function (data, callback) {
        var found = database['arr'].filter(function (item) {
            if (item['user name'] === data['user name'] && item['user id'] === data['user id']) {
                return true;
            }
            else {
                return false;
            }
        });
        if (found[0]['secure key'] === data['secure key']) {
            callback({
                '__id': found[0]['__id'],
                'auth': true
            });
            return;
        }
        else {
            callback({ 'auth': false });
            return;
        }
    });
    // get data
    socket.on('get', function (data, callback) {
        // value key
        var keys = data['keys'];
        // founded user data
        var found = database['arr'].filter(function (item) { return item['__id'] === data['__id']; });
        if (typeof keys === 'string') {
            callback(found[0][keys]);
        }
        else if (typeof keys === 'object') {
            var rs = {};
            for (var i = 0; i < keys.length; i++) {
                rs[keys[i]] = found[0][keys[i]];
            }
            callback(rs);
        }
    });
    // friends methods
    socket.on('friends', function (data, callback) {
        if (data.method === 'get') {
            var profile = database['arr'].filter(function (item) { return item['__id'] === data['__id']; });
            var found = database['arr'].filter(function (item) { return (item['Id\'s']['FI'] === data['FI']); });
            if (found.length === 0) {
                callback(false);
                return 0;
            }
            var reply = {
                'name': found[0]['user name'],
                'FI': data['FI'],
                'inbox': found[0]['inbox']
            };
            callback(reply);
            return 0;
        }
        else if (data.method === 'add') {
            database['arr'].filter(function (item) {
                if (item['__id'] === data['__id']) {
                    var found = item.friends.filter(function (friend) {
                        if (friend['FI'] === data['FI']) {
                            callback(false);
                        }
                    });
                    item.friends.push({
                        'FI': data['FI'],
                        inbox: []
                    });
                    callback(true);
                    return true;
                }
                else
                    return false;
            });
            callback({
                'FI': data['FI'],
                inbox: []
            });
        }
        else if (data.method === 'delete') {
            database['arr'].filter(function (item) {
                if (item['__id'] === data['__id']) {
                    var index = item.friends.indexOf(item.friends.filter(function (friend) { return friend['FI'] === data['FI']; })[0]);
                    item.friends.splice(index, 1);
                    callback(true);
                }
                else
                    return false;
            });
        }
        else
            callback(false);
    });
});
io.listen(PORT, console.log(' api: run ... '));
