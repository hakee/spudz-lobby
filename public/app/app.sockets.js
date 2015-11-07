( function () {
    'use strict';

    module.exports = function ($websocket) {
        var ws = $websocket.$new('ws://spudz.lo:8001'); // instance of ngWebsocket, handled by $websocket service

        ws.$on('$open', function () {
            console.log('Oh my gosh, websocket is really open! Fukken awesome!');

//            ws.$emit('ping', 'hi listening websocket server'); // send a message to the websocket server
//
//            var data = {
//                level: 1,
//                text: 'ngWebsocket rocks!',
//                array: ['one', 'two', 'three'],
//                nested: {
//                    level: 2,
//                    deeper: [{
//                        hell: 'yeah'
//                    }, {
//                        so: 'good'
//                    }]
//                }
//            };
//
//            ws.$emit('pong', data);
        });
        ws.$on('$message', function () {
            console.log('something received on the socket');
        });

        ws.$on('$close', function () {
            console.log('Noooooooooou, I want to have more fun with ngWebsocket, damn it!');
        });
    }
}());
