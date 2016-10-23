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

        self.posX = 100;
        self.posY = 100;

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
                            'width': 1600,
                            'height': 800,
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

                        var mapXSize = 15;
                        var mapYSize = 15;

                        //Create the tile map
                        self.textureMap1 = new IgeTextureMap()
                            .id('tileMap1')
                            .depth(1)
                            .tileWidth(50)
                            .tileHeight(50)
                            .gridSize(mapXSize, mapYSize)
                            .drawGrid(true)
                            .drawMouse(true)
                            .gridColor("#ff6600")
                            //.gridColor("#009933")
                            //.highlightOccupied(true)
                            //.drawBounds(false)
                            //.mouseUp(function (event, evc, data) {
                            //    console.log(this.id(), this.mouseToTile(), arguments);
                            //})
                            .mount(uiScene);

                        self.textureMap1
                            .translateTo(-450, -370, 0);

                        var tileCell;
                        var licznik = 0;
                        for (var i=0;i<mapXSize;i++){
                            for (var j=0;j<mapYSize;j++){
                                //tileCell = Math.round(Math.random() * 60) + 1;
                                if (licznik < 5){
                                    licznik++;
                                }
                                {
                                    tileCell = 98 + Math.round(Math.random() * 4);
                                }

                                console.log(tileCell);
                                new IgeEntity()
                                    //.id('entity1')
                                    .depth(2)
                                    // Set the entity texture to the cell sheet we created earlier
                                    .texture(gameTexture[2])
                                    .mount(self.textureMap1)
                                    // Set the cell to 1... this is the FIRST cell in the sheet
                                    .cell(tileCell)
                                    .translateToTile(i, j, 0)
                                    .widthByTile(1)
                                    .heightByTile(1)
                                    .drawBounds(true);
                                // Set the entity's width and height to match the cell we are using
                                //.dimensionsFromCell()
                                //.translateTo(0, 0, 0);
                             //   console.log(i, j);
                            }
                        }

                        // Create an entity
                        new IgeEntity()
                            .id('barrack')
                            .depth(3)
                            .texture(gameTexture[3])
                            .mount(self.textureMap1)
                            .translateToTile(1, 1, 0)
                            .widthByTile(1)
                            .heightByTile(1)
                            //.translateToTile(0.5, 0.5, 0)
                            .drawBounds(false)
                            .tileWidth(1)
                            .tileHeight(1)
                            .occupyTile()
                            .mouseUp(function (event, evc, data) {
                                console.log('You clicked a barrack.');
                            });;

                        new IgeEntity()
                            .id('base')
                            .depth(3)
                            .texture(gameTexture[4])
                            .mount(self.textureMap1)
                            .translateToTile(2, 2, 0)
                            .widthByTile(1)
                            .heightByTile(1)
                            .drawBounds(false)
                            .tileWidth(1)
                            .tileHeight(1)
                            .occupyTile()
                            .mouseUp(function (event, evc, data) {
                                console.log('You clicked a base.');
                                console.log(self.posX, self.posY);
                            });

                        //self.textureMap2 = self.textureMap1.clone();

                        //self.textureMap2
                        //.translateTo(0, -200, 0);

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