var Platformer = Platformer || {};

Platformer.Tiled = function () {};

Platformer.Tiled.prototype = {
	init: function (level_data) {

		var tileset_index;

		this.level_data = level_data;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 1000;

		this.map = this.game.add.tilemap(level_data.map.key);

		//this.map.addTilesetImage (this.map.tilesets[0].name, level_data.map.tileset);

		tileset_index=0;
		this.map.tilesets.forEach(function (tileset){

			this.map.addTilesetImage (tileset.name, level_data.map.tilesets[tileset_index]);
			tileset_index+=1;
		},this);

		this.prefab_classes = {

			"player": Platformer.Player.prototype.constructor,
			"ground_enemy": Platformer.GroundEnemy.prototype.constructor,
			"flying_enemy": Platformer.FlyingEnemy.prototype.constructor,
			"running_enemy": Platformer.RunningEnemy.prototype.constructor,
			"goal": Platformer.Goal.prototype.constructor,
			"checkpoint": Platformer.Checkpoint.prototype.constructor,
			"coin": Platformer.Coin.prototype.constructor,
			"score": Platformer.Score.prototype.constructor

		}


	},

	create: function () {
		
		var group_name, object_layer, collision_tiles;

		this.layers = {};
		this.map.layers.forEach (function (layer){	
				this.layers[layer.name] = this.map.createLayer(layer.name);
				this.map.createLayer(layer.name);
				if (layer.properties.collision){
						collision_tiles = [];

						layer.data.forEach(function(data_row){

								data_row.forEach(function(tile){

											if (tile.index > 0 && collision_tiles.indexOf(tile.index)=== -1)
													collision_tiles.push(tile.index);
										}, this);

						}, this);

						this.map.setCollision (collision_tiles, true, layer.name);

				}

		}, this);

		this.layers[this.map.layer.name].resizeWorld();
		this.groups = {};

		this.level_data.groups.forEach(function (group_name){
				this.groups[group_name]=this.game.add.group();

		},this);

		this.prefabs = {};

		for (object_layer in this.map.objects){
			if (this.map.objects.hasOwnProperty(object_layer)){
					this.map.objects[object_layer].forEach(this.create_object,this);

			}

		}
		this.game.camera.follow(this.prefabs.player);
	},

	create_object: function (object) {
			var position, prefab;
			position =  {"x": object.x + (this.map.tileHeight/2), "y": object.y - (this.map.tileHeight/2) };
			prefab= new this.prefab_classes[object.type](this, position, object.properties);
			this.prefabs[object.name]= prefab;


	},

	restart_level: function () {
			if(this.prefabs.checkpoint.checkpoint_reached){
				this.prefabs.player.x= this.prefabs.checkpoint.x;
				this.prefabs.player.y= this.prefabs.checkpoint.y;
			}
			else{
			this.game.state.restart(true, false, this.level_data);
			}
	}
};