const port = "1500";
const io = require('socket.io')(port, {
    cors: {
        origin: '*',
    }
});
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        lth = Object.keys(users).length;
        socket.broadcast.emit('user-joined', { name: name, length: lth });
    });

    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, user: users[socket.id] })
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});



// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// const port = process.env.PORT || 1500;
// app.get('/', function(req, res) {
//     res.sendfile('../index.html');
// });

// io.on('connection', socket => {
//     socket.on('new-user-joined', name => {
//         users[socket.id] = name;
//         lth = Object.keys(users).length;
//         socket.broadcast.emit('user-joined', { name: name, length: lth });
//     });

//     socket.on('send', message => {
//         socket.broadcast.emit('recieve', { message: message, user: users[socket.id] })
//     });

//     socket.on('disconnect', message => {
//         socket.broadcast.emit('leave', users[socket.id]);
//         delete users[socket.id];
//     });
// });
// server.listen(port, function() {
//     console.log(`Listening on port ${port}`);
// });