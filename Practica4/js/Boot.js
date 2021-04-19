var Platformer = Platformer || {};

Platformer.Boot = function(){
	//Phaser.State.call(this);
};

Platformer.Boot.prototype = {
	init: function( level_file){

		this.level_file = level_file;
	},

	preload: function(){

		this.load.text("level1", this.level_file);

	},
	create: function(){

		var level_text, level_data;
		level_text=this.game.cache.getText("level1");
		level_data= JSON.parse (level_text);


		this.game.state.start('Loading', true, false, level_data);
	}
};