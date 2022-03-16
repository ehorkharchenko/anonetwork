var mongoose = require('mongoose');
var io = require('socket.io')();
var PORT = 3750;
/*  Initialize publication model  */
var PublicationSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateOfPublish: {
        type: String,
        required: true
    },
    pref: {
        type: Object,
        required: true,
        "default": {}
    }
});
mongoose.model('publications', PublicationSchema);
// connect to database
mongoose.connect('mongodb://localhost:1750/publications-storage', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(function () { return console.log('  database connect success .. '); })["catch"](function () { return console.log('  database connect failed .. '); });
/*  sockets  */
io.on('connection', function (socket) {
    // Get publications from publications-storage
    socket.on('get fresh publications', function (data, callback) {
        callback([]);
    });
    // Get hot publications from publications-storage
    socket.on('get hot publications', function (data, callback) {
        callback([]);
    });
    // Append publication on database
    socket.on('publish', function (data, callback) {
        var idcreator = function (id) {
            var symbols = [
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B',
                'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
                'y', 'z'
            ];
            for (var i = 1; i <= 63; i++)
                id += symbols[Math.floor(Math.random() * Math.floor(62))];
            return id;
        };
        // Append publication on database
        var publication = new mongoose.model('publications')({
            _id: idcreator(''),
            type: data.type,
            content: data.content,
            dateOfPublish: '10.27.2020(10:28:20)'
        }).save()
            .then(function (publication) {
            console.log(publication);
            callback(true);
        })["catch"](function (err) {
            console.log(err);
            callback(false);
        });
    });
});
io.listen(PORT, console.log("\n  Live API run on Ip: localhost:" + PORT + " "));
