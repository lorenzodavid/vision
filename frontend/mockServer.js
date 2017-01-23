/*global exports, console, require*/
const serveStatic = require('serve-static');
const WebSocket = require('ws');
const _ = require('lodash');
const visionMiddlewares = require('./mockServerUtils/middlewares')
function setupLivereloadWebsocketProxy (server, wss) {
  wss = wss || new WebSocket.Server({server: server});
  wss.on('connection', function (clientSocket) {
    var onClientMessage,
      onServerMessage,
      connectionSocket = new WebSocket('ws://localhost:35729/livereload');
    onClientMessage = function (data) {
      if (connectionSocket.readyState === WebSocket.OPEN) {
        connectionSocket.send(data);
      } else {
        connectionSocket.on('open', function () {
          console.log('livereoload proxy: socket not ready to send, queueing message');
          connectionSocket.send(data);
        });
      }
    };
    onServerMessage = function (data) {
      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(data);
      } else {
        console.log('livereoload proxy: socket not ready to send, queueing message');
        clientSocket.on('open', function () {
          clientSocket.send(data);
        });
      }
    };
    // clientSocket.send('jjhello')
    // console.log('connection');
    connectionSocket.on('message', onServerMessage);
    clientSocket.on('message', onClientMessage);
    // console.log(clientSocket)
    clientSocket.on('close', function () {
      // console.log('closed');
      connectionSocket.close();
      onServerMessage = _.noop;
      onClientMessage = _.noop;
    });
    connectionSocket.on('error', () => {
      console.log('failed to proxy over livereload ws, livereload server not available');
    });
    clientSocket.on('error', function () {
      console.log('failed to proxy over livereload ws, livereload server not available');
    });
  });
  return wss;
}
const onCreateServer = (server, connect, options) => {
  _.noop(connect, options);
  let wss = null;
  // if (livereload) {
  wss = setupLivereloadWebsocketProxy(server, wss);
};
const serverMiddleware = function (connect, options, middlewares) {
  _.noop(middlewares);

  console.log('99')
  console.log(visionMiddlewares);
  console.log(visionMiddlewares.parseQuery)
  console.log('990')
  let newMiddlewares = [
    visionMiddlewares.parseQuery,
    visionMiddlewares.parseJSONBody,
    visionMiddlewares.createVisionAPI(),
    serveStatic(options.base[0].path)
  ];
  return newMiddlewares;
};
module.exports = {
  onCreateServer: onCreateServer,
  serverMiddleware: serverMiddleware
};
