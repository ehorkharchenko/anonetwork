"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var io = require("socket.io");
var mongoose = require("mongoose");
var cryptograph = require("crypto");
var sock = io();
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
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(function () { return console.log('>  database connect success .. '); })["catch"](function () { return console.log('>  database connect failed .. '); });
var Anonym = mongoose.model('anonyms');
var PORT = 3650;
function find(id) {
    return new Promise(function (resolve, reject) {
        Anonym.find({ _id: id })
            .then(function (anonyms) {
            resolve(anonyms);
        })["catch"](function (err) { return reject(err); });
    });
}
function emergencyEncrypt(input) {
    var cryptkey = cryptograph
        .createHash('sha512')
        .update(input)
        .digest('hex');
    var _a = [cryptkey.split(''), ''], inp = _a[0], out = _a[1];
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
    for (var i = 0; i < inp.length; i++)
        out += inp[i] + table[i];
    inp = out.split('').reverse();
    out = '';
    for (var i = 0; i < 3; i++)
        for (var j = 1; i < 109; i++) {
            out += inp[j];
            if (j % 3 === 0)
                out += table[(j - 1)];
        }
    return out = out.split('').reverse() + table[96];
}
sock.on('connection', function (socket) {
    var _this = this;
    socket.on('enter', function (data, callback) {
        function crypto() {
            var hash = cryptograph
                .createHash('sha512')
                .update(data['secure key'])
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
            return output = output.split('').reverse().join('') +
                table[input[16]] + table[input[32]] +
                table[input[64]] + table[input[127]];
        }
        Anonym.find({ 'anonym name': data['anonym name'], 'anonym id': data['anonym id'] })
            .then(function (anonyms) {
            if (anonyms.length > 0) {
                if (anonyms[0]['secure key'] === crypto())
                    callback({
                        _id: anonyms[0]['_id'],
                        auth: true
                    });
                else
                    callback({ auth: false });
            }
            else
                callback({ auth: false });
        })["catch"](function (err) {
            console.log(err);
            callback({ auth: -1 });
        });
    });
    socket.on('generate emergency key', function (data, callback) {
        var generate = new Promise(function (resolve, reject) {
            var input = function (str) {
                if (str === void 0) { str = ''; }
                var symbols_list = [
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
                ];
                for (var i = 1; i <= 3096; i++)
                    str += symbols_list[Math.floor(Math.random() * Math.floor(62))];
                return str;
            }();
            resolve({
                key: emergencyEncrypt,
                file: input
            });
        });
        Anonym.find({ 'anonym name': data['anonym name'], 'anonym id': data['anonym id'] })
            .then(function (anonyms) {
            if (anonyms.length === 1) {
                generate
                    .then(function (data) {
                    anonyms[0]['emergency key'] = data.key;
                    callback({
                        _id: anonyms[0]['_id'],
                        file: data.file
                    });
                });
            }
            else
                callback(-1);
        })["catch"](function (err) { return console.log(err); });
    });
    /* GET method */
    socket.on('get', function (data, callback) {
        find(data['_id'])
            .then(function (anonyms) {
            if (anonyms.length > 0)
                if (data.key !== undefined) {
                    callback(anonyms[0][data.key]);
                }
                else if (data.keys !== undefined) {
                    var output = {};
                    for (var i = 0; i < data.keys.length; i++)
                        output[data.keys[i]] = anonyms[0][data.keys[i]];
                    callback(output);
                }
                else
                    callback(-1);
            else
                callback(0);
        });
    });
    /* PUSH method */
    socket.on('push', function (data, callback) {
        find(data['_id'])
            .then(function (anonyms) {
            if (anonyms.length > 0) {
                if (data.key !== undefined) {
                    if (data.method === 'on')
                        anonyms[0][data.key] = data.val;
                    else if (data.method === 'in')
                        if (data.to === 'arr')
                            anonyms[0][data.key] = __spreadArrays(anonyms[0][data.key], [data.val]);
                        else if (data.to === 'obj')
                            anonyms[0][data.key][data.val.key] = data.val.val;
                }
                else if (data.keys !== undefined) {
                    data.keys.map(function (key) {
                        if (data.method === 'on')
                            anonyms[0][key] = data.vals[data.keys.indexOf(key)];
                        else if (data.method === 'in')
                            if (data.to === 'arr')
                                anonyms[0][key].push(data.vals[data.keys.indexOf(key)]);
                            else if (data.to === 'obj')
                                anonyms[0][key][data.vals[data.keys.indexOf(key)].key] = data.vals[data.keys.indexOf(key)].val;
                    });
                }
                else
                    callback(-1);
                anonyms[0].save()
                    .then(function (obj) { return callback(obj.friends); })["catch"](function (err) { return console.log(err); });
            }
            else
                callback(-1);
        })["catch"]();
    });
    /* DELETE method */
    socket.on('delete', function (data, callback) {
    });
    /* EDIT method */
    socket.on('edit', function (data, callback) {
        find(data['_id'])
            .then(function (anonyms) {
            if (anonyms.length > 0) {
                if (data.key !== undefined)
                    anonyms[0][data.key] = data.key;
                else if (data.keys !== undefined)
                    data.keys.map(function (key) {
                        anonyms[0][key[0]] = key[1];
                    });
                anonyms[0].save()
                    .then(function (obj) { return callback(true); })["catch"](function (err) { return callback(-1); });
            }
            else
                callback(-1);
        })["catch"](function (err) { return console.log(err); });
    });
    /* My Friends API */
    socket.on('get friends', function (data, callback) {
        Anonym.findById(data['_id'])
            .then(function (anonym) {
            console.log(anonym);
            callback(anonym['friends']);
        })["catch"](function (err) { return console.log(err); });
    });
    socket.on('friend push', function (data, callback) {
        Anonym.findById(data['_id'])
            .then(function (anonym) {
            Anonym.updateOne({ _id: anonym['_id'] }, { friends: __spreadArrays(anonym['friends'], [data.friend]) })
                .then()["catch"](function (err) { return console.log(err); });
        })["catch"](function (err) { return console.log(err); });
    });
    socket.on('friend delete', function (data, callback) {
        Anonym.findById(data['_id'])
            .then(function (anonym) { return __awaiter(_this, void 0, void 0, function () {
            var friends;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        friends = anonym['friends'].filter(function (friend) { return friend.MI !== data.MI; });
                        return [4 /*yield*/, Anonym.updateOne({ _id: anonym['_id'] }, { friends: friends })
                                .then()["catch"](function (err) { return console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })["catch"](function (err) { return console.log(err); });
    });
});
sock.listen(PORT, console.log(" \n>  M - API run on Ip: localhost:" + PORT));
