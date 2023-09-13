const ipc = require("@node-ipc/node-ipc").default;

console.log("hello, pm2 module");

ipc.config.id = "world";
ipc.config.retry = 1500;

ipc.serve(function () {
  ipc.server.on('app.message', function (data, socket) {
    console.log('World Server got a message: ' + JSON.stringify(data));
    ipc.server.emit(socket, 'app.message', {
      id: ipc.config.id,
      message: data.message + ' world'
    });
  });
});

ipc.server.start();