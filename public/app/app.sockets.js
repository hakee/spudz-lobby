( function () {
    'use strict';

    module.exports = function ($websocket) {
        var ws = $websocket.$new('ws://192.168.8.2:8001'); // instance of ngWebsocket, handled by $websocket service
        console.log(ws);
        ws.$on('$open', function () {
            console.log('Oh my gosh, websocket is really open! Fukken awesome!');

        });
        ws.$on('$message', function () {
            console.log('something received on the socket');
        });

        ws.$on('$close', function () {
            console.log('Noooooooooou, I want to have more fun with ngWebsocket, damn it!');
        });
    }
}());
