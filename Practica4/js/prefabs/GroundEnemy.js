var Platformer = Platformer || {};

Platformer.GroundEnemy = function (game_state, position, properties) {

	Platformer.Enemy.call(this, game_state, position, properties);
	
};

Platformer.GroundEnemy.prototype = Object.create(Platformer.Enemy.prototype);
Platformer.GroundEnemy.prototype.constructor = Platformer.GroundEnemy;

Platformer.GroundEnemy.prototype.update = function () {

	this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

	if (this.body.blocked.down && ! this.has_tile_to_walk()){
		this.body.velocity.x *=-1;
		this.scale.setTo(-this.scale.x,1);
	}
};

Platformer.GroundEnemy.prototype.has_tile_to_walk = function(){
	var direction, position_to_check, map, next_tile;
	if(this.body.velocity.x<0)
		direction=-1;
	else
		direction=1;

	position_to_check = new Phaser.Point(this.x + (direction* (this.game_state.map.tileWidth)), this.bottom+1);
	map= this.game_state.map;
	next_tile= map.getTileWorldXY(position_to_check.x,position_to_check.y, map.tileWidth, map.TileHeight, "collision");
	return next_tile != null;

}