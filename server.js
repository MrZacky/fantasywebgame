var Server = IgeClass.extend({
	classId: 'Server',
	Server: true,

	init: function (options) {
        var self = this;
		// Start the network server

        // Define an object to hold references to our player entities
        this.players = {};

        // Add the server-side game methods / event handlers
        this.implement(ServerNetworkEvents);

		ige.addComponent(IgeMongoDbComponent, options.db).mongo.connect(function (err, db) {
			// Check if we connected to m ongo correctly
			if (!err) {
				ige.mongo.remove('map', {}, function (err, results) {
					if (!err) {
						console.log('Map removed successfully');
						// Insert something
						var firstTilePosX = 100;
						var firstTilePosY = 100;

						var tileSizeX = 45;
						var tileSizeY = 45;

						// Insert something
						ige.mongo.insert('user', {id: 1, username:'test', password:'test'}, function (err, results){
							if (!err) {
								console.log('Insert successful');
								console.log(results);
							}
							else{
								console.log('Error');
							}
						});
						ige.mongo.insert('map', {id: 1, tileid:1, x:firstTilePosX, y:firstTilePosY}, function (err, results){
							if (!err) {
								console.log('Insert successful');
								console.log(results);
							}
							else{
								console.log('Error');
							}
						});
						ige.mongo.insert('map', {id: 2, tileid:3, x:firstTilePosX+tileSizeX, y:firstTilePosY}, function (err, results){
							if (!err) {
								console.log('Insert successful');
								console.log(results);
							}
							else{
								console.log('Error');
							}
						});
						ige.mongo.insert('map', {id: 3, tileid:2, x:firstTilePosX+2*tileSizeX, y:firstTilePosY}, function (err, results){
							if (!err) {
								console.log('Insert successful');
								console.log(results);
							}
							else{
								console.log('Error');
							}
						});
					} else {
						console.log('Error', err);
					}
				});
			}
		});

        // Add the networking component
        ige.addComponent(IgeNetIoComponent)

            .network.define('loadMap', self._onLoadMap) // Defined in ./gameClasses/ServerNetworkEvents.js
            // Start the network server
            .network.start(2000, function () {
                // Networking has started so start the game engine
                ige.start(function (success) {
                    // Check if the engine started successfully
                    if (success) {
                        // Create some network commands we will need

                        ige.network.on('connect', self._onPlayerConnect); // Defined in ./gameClasses/ServerNetworkEvents.js
                        ige.network.on('disconnect', self._onPlayerDisconnect); // Defined in ./gameClasses/ServerNetworkEvents.js

                        // Add the network stream component
                        ige.network.addComponent(IgeStreamComponent)
                            .stream.sendInterval(30) // Send a stream update once every 30 milliseconds
                            .stream.start(); // Start the stream

                        // Accept incoming network connections
                        ige.network.acceptConnections(true);
                    }
                });
            });
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Server; }