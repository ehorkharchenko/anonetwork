"use strict";
exports.__esModule = true;
var io = require("socket.io");
var mongoose = require("mongoose");
var crypto = require("crypto");
var sock = io();
var cryptograph = crypto;
var AnonymSchema = new mongoose.Schema({
    "_id": {
        type: String,
        required: true
    },
    "MI": {
        type: String,
        required: true
    },
    "anonym name": {
        type: String,
        required: true
    },
    "anonym id": {
        type: String,
        required: true
    },
    "secure key": {
        type: String,
        required: true
    },
    "emergency key": {
        type: String || Number,
        required: true,
        "default": 0
    },
    "friends": {
        type: Object,
        required: true
    },
    "find": {
        type: Object,
        required: true,
        "default": {
            "ban": null,
            "warn": 0,
            "pref": {
                "sex": [0, 0],
                "type": 0,
                "other": {
                    "lang": 'English',
                    "second": true
                }
            }
        }
    }
});
mongoose.model('anonyms', AnonymSchema);
mongoose.connect('mongodb://localhost:1750/storage', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(function () { return console.log('>  database connect success .. '); })["catch"](function () { return console.log('>  database connect failed .. '); });
var Anonym = mongoose.model('anonyms');
var PORT = 1650;
function generatesymbols(count, separator, str) {
    if (separator === void 0) { separator = false; }
    if (str === void 0) { str = ''; }
    var symbols_list = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    for (var i = 1; i <= count; i++) {
        str += symbols_list[Math.floor(Math.random() * Math.floor(62))];
        if (separator && ((i % 6) === 0 && i !== 60))
            str += '_';
    }
    return str;
}
sock.on('connection', function (socket) {
    socket.on('free', function (name, callback) {
        Anonym.find({ 'anonym name': name }).then(function (anonyms) {
            if (anonyms.length < 1000)
                callback(true);
            else
                callback(false);
        });
    });
    socket.on('join', function (data, callback) {
        var getID = new Promise(function (resolve, reject) {
            var _id = generatesymbols(60, true);
            Anonym.find({ _id: _id })
                .then(function (anonyms) {
                if (anonyms.length > 0)
                    reject(-1);
                else
                    resolve(_id);
            })["catch"](function (err) { return reject(err); });
        });
        var getMI = new Promise(function (resolve, reject) {
            var MI = generatesymbols(32);
            Anonym.find({ MI: MI })
                .then(function (anonyms) {
                if (anonyms.length > 0)
                    reject(-1);
                else
                    resolve(MI);
            });
        });
        var getAnonym = new Promise(function (resolve, reject) {
            Anonym.find({ 'anonym name': data['name'] }).sort({ 'anonym id': 1 })
                .then(function (anonyms) {
                console.log(anonyms);
                if (anonyms.length < 1000)
                    if (anonyms.length === 0)
                        resolve({
                            name: data['name'],
                            id: '001'
                        });
                    else {
                        anonyms.map(function (anonym) {
                            var j = anonyms.indexOf(anonym) + 1;
                            var ID = (j > 99) ? j : (j > 9) ? '0' + j : '00' + j;
                            if (anonym['anonym id'] !== ID) {
                                resolve({
                                    name: data['name'],
                                    id: ID
                                });
                            }
                            else if (anonym['anonym id'] === ID && ((anonyms.length - 1) < j)) {
                                resolve({
                                    name: data['name'],
                                    id: ((+ID + 1) > 99) ? +ID + 1 : ((+ID + 1) > 9) ? '0' + (+ID + 1) : '00' + (+ID + 1)
                                });
                            }
                        });
                    }
                else
                    reject();
            });
        });
        var getCryptoKey = new Promise(function (resolve, reject) {
            var hash = cryptograph
                .createHash('sha512')
                .update(data['key'])
                .digest('hex');
            var _a = [hash.split(''), ''], input = _a[0], output = _a[1];
            var table = {
                a: '1', b: 'w', c: 'C', d: 'u', e: 'E', f: 'y', g: 'o', h: 'U',
                i: 'a', j: 'i', k: '6', l: 'D', m: 'P', n: 'R', o: 'W', p: '5',
                q: 'B', r: 'n', s: 'f', t: 'j', u: 'b', v: '0', w: 'T', x: 'Y',
                y: 'l', z: '2',
                A: 'r', B: 'V', C: 'J', D: 't', E: 'K', F: 'N', G: 'L', H: 'X',
                I: '9', J: 'p', K: '4', L: 'g', M: '3', N: 'Q', O: 'h', P: 'S',
                Q: 'M', R: 'x', S: 'c', T: 'A', U: 'k', V: 'D', W: 'I', X: 'O',
                Y: '7', Z: 's',
                '0': '8', '1': 'F', '2': 'H', '3': 'v', '4': 'd',
                '5': 'm', '6': 'q', '7': 'G', '8': 'z', '9': 'e'
            };
            for (var _b = [0, false], i = _b[0], bool = _b[1]; i < input.length; i++) {
                if (bool)
                    output += table[input[i]];
                output += input[i];
                bool = !bool;
            }
            output = output.split('').reverse().join('') +
                table[input[16]] + table[input[32]] +
                table[input[64]] + table[input[127]];
            resolve(output);
        });
        Promise
            .all([
            getID,
            getMI,
            getAnonym,
            getCryptoKey
        ])
            .then(function (_a) {
            var PI = _a[0], MI = _a[1], ANONYM = _a[2], cryptokey = _a[3];
            var anonym = new Anonym({
                '_id': PI,
                'MI': MI,
                'anonym name': ANONYM.name,
                'anonym id': ANONYM.id,
                'secure key': cryptokey,
                'friends': []
            });
            anonym.save()
                .then(function (anonym) {
                console.log(anonym);
                callback({
                    anonym: {
                        name: anonym['anonym name'],
                        id: anonym['anonym id']
                    },
                    status: 0
                });
            })["catch"](function (err) { return console.log(err); });
        })["catch"](function (err) { return console.log(err); });
    });
});
sock.listen(PORT, console.log(" \n>  Join API run on Ip: localhost:" + PORT + " "));
