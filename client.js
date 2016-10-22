var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(1);
        //ige.input.debug(true);

		// Enabled texture smoothing when scaling textures
		//ige.globalSmoothing(true);

        // Enable networking
        ige.addComponent(IgeNetIoComponent);

        // Implement our game methods
        this.implement(ClientNetworkEvents);

        // Create the HTML canvas
        ige.createFrontBuffer(true);

		// Load our textures
		var self = this,
            gameTexture = [];

		this.obj = [];

		gameTexture[0] = new IgeTexture('assets/textures/sprites/fairy.png');
		gameTexture[1] = new IgeCellSheet('assets/textures/tiles/grassSheet.png', 4, 1);
		gameTexture[2] = new IgeCellSheet('assets/ZBG_Graphics/tilea5b.png', 8, 16);
        gameTexture[3] = new IgeTexture('assets/ZBG_Graphics/barrack.png');
        gameTexture[4] = new IgeTexture('assets/ZBG_Graphics/main.png');



		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {
			// Create the HTML canvas
			ige.createFrontBuffer(true);

			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
                    ige.network.start('http://localhost:2000', function () {
                        console.log("Init function loaded");

                        // Add base scene data to graph
                        ige.addGraph('IgeBaseScene');

                        var uiScene = ige.$('baseScene'),
                                        uiScene;

                        // Create the UI scene
                        uiScene = new IgeScene2d()
                            .id('uiScene')
                            .depth(1)
                            .ignoreCamera(true)
                            .mount(ige.$('baseScene'));

                        ige.ui.style('.myStyle', {
                            'width': '90%',
                            'height': '90%',
                            'borderColor': '#ffffff',
                            'borderRadius' : 15,
                            'borderWidth' : 1,
                            'backgroundColor' : null
                        });

                        ige.ui.style('.myStyle:focus', {
                            'borderColor': '#ffff00'
                        });

                        ige.ui.style('#tx1', {
                           // 'color' : '#000000',
                            'width': 300,
                            'height': 60,
                            'top': 10,
                            'left' : 10,
                            'borderRadius' : 5
                        });

                        self.div1 = new IgeUiElement()
                            .id('div1')
                            .styleClass('myStyle')
                            .mount(uiScene);

                        self.tx1 = new IgeUiTextBox()
                            .id('tx1')
                            .value('tekst')
                            .styleClass('myStyle')
                            .mount(self.div1);

                        self.tx1._fontEntity
                            .nativeFont('Verdana 12px')
                            .colorOverlay('#ffff00');

                        self.scene1 = new IgeScene2d()
                            .id('scene1')
                            .translateTo(0, 0, 0)
                            .drawBounds(false)
                            .mount(uiScene);

                        var mapXSize = 4;
                        var mapYSize = 3;

                        //Create the tile map
                        self.textureMap1 = new IgeTextureMap()
                            .id('tileMap1')
                            .depth(0)
                            .tileWidth(128)
                            .tileHeight(128)
                            .gridSize(mapXSize, mapYSize)
                            .drawGrid(true)
                            .drawMouse(true)
                            .translateTo(-400, -200, 0)
                            .gridColor("#ff6600")
                            //.gridColor("#009933")
                            //.highlightOccupied(true)
                            //.drawBounds(false)
                            .mouseUp(function (event, evc, data) {
                                console.log(this.id(), this.mouseToTile(), arguments);
                            })
                            .mount(uiScene);

                        for (var i=0;i<mapXSize;i++){
                            for (var j=0;j<mapYSize;j++){
                                new IgeEntity()
                                    //.id('entity1')
                                    .depth(1)
                                    // Set the entity texture to the cell sheet we created earlier
                                    .texture(gameTexture[2])
                                    .mount(self.textureMap1)
                                    // Set the cell to 1... this is the FIRST cell in the sheet
                                    .cell(Math.round(Math.random() * 60))
                                    .translateToTile(i, j, 0)
                                    .widthByTile(1)
                                    .heightByTile(1)
                                    .drawBounds(true);
                                // Set the entity's width and height to match the cell we are using
                                //.dimensionsFromCell()
                                //.translateTo(0, 0, 0);
                            }
                        }

                        // Create an entity
                        new IgeEntity()
                            .id('fairy1')
                            .depth(2)
                            .texture(gameTexture[3])
                            .mount(self.textureMap1)
                            .translateToTile(1, 1, 0)
                            .widthByTile(1)
                            .heightByTile(1)
                            //.translateToTile(0.5, 0.5, 0)
                            .drawBounds(false)
                            .tileWidth(1)
                            .tileHeight(1)
                            .occupyTile();

                        new IgeEntity()
                            .id('fairy2')
                            .depth(2)
                            .texture(gameTexture[4])
                            .mount(self.textureMap1)
                            .translateToTile(2, 2, 0)
                            .widthByTile(1)
                            .heightByTile(1)
                            .drawBounds(false)
                            .tileWidth(1)
                            .tileHeight(1)
                            .occupyTile();

                        // Send the server a request (gets a callback when the server responds!)
                        //var map;
                        ige.network.request('loadMap', {}, function (commandName, data) {
                            console.log('Map loaded on client');
                            console.log('Request response received from server via callback with data:', data);
                            //for (var i=0;i<data.map.length)
                            //console.log(data.map[0]);
                            var map = data.map;
                            for (var tile in map){
                                console.log(map[tile]);
                                console.log(map[tile].x, map[tile].y);
                                //new IgeTi
                            }
                            //map = data;
                        });
                    });
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }