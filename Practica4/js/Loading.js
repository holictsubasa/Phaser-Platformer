var Platformer = Platformer || {};

Platformer.Loading = function(){};

Platformer.Loading.prototype = {
	init: function( level_data){

		this.level_data = level_data;
	},

	preload: function(){

		var assets, asset_loader, asset_key, asset;
		assets = this.level_data.assets;
		for (asset_key in assets){
			asset= assets[asset_key];
			switch (asset.type){
					case "image":
						this.load.image(asset_key,asset.source);
						break;
					case "spritesheet":
						this.load.spritesheet(asset_key,asset.source,asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
						break;
					case "tilemap":
					this.load.tilemap(asset_key,asset.source, null, Phaser.Tilemap.TILED_JSON);
					break;

			}

		}

	},
	create: function(){


		this.game.state.start('Tiled', true, false, this.level_data);
	}
};