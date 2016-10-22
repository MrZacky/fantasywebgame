var ServerNetworkEvents = {
	/*_onLoadMap: function (map, clientId) {
		ige.server.players[clientId].map = map;
	},*/

	_onPlayerConnect: function (socket) {
		// Don't reject the client connection
		return false;
	},


    _onLoadMap : function (data, clientId, requestId){
        console.log('Map loaded on server');
        var map = ige.mongo.findAll('map', {}, function (err, rows){
            if (!err) {
                console.log("Map found");
                console.log('Client testRequest command received from client id "' + clientId + '" with data:', data);
                ige.network.response(requestId, {map:rows});
            }
        });
    },

	_onPlayerDisconnect: function (clientId) {
		if (ige.server.players[clientId]) {
			// Remove the player from the game
			ige.server.players[clientId].destroy();

			// Remove the reference to the player entity
			// so that we don't leak memory
			delete ige.server.players[clientId];
		}
	}
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ServerNetworkEvents; }