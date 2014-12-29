'use strict';
var net = require('net');
var createDecoder = require('./decoder');
var encoder = require('./encoder');

module.exports = createServer;
        
function createServer(){
    var server = net.createServer(function(socket) { //'connection' listener
        console.log('client connected');
        var decoder = createDecoder();

        socket.on('end', function() {
            console.log('client disconnected');
        });
        socket.on('data', function(data) {
            try {
                decoder.write(data);
            } catch (e) {
                console.log("Decoding error, dropping connection", e.message);
                socket.destroy();
            }
        });

        decoder.on("readable", function() {
            var request;
            while (request = decoder.read()) {
                console.log('got request', request);

                // process request

                // write response
                socket.write(encoder.encode('<GetLoyaltyOnlineStatusResponse><PromptForLoyaltyFlag value="yes"/></GetLoyaltyOnlineStatusResponse>'));
            }
        });

    });   
    
    return server;
};


