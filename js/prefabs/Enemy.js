var Platformer = Platformer || {};

Platformer.Enemy = function (game_state, position, properties) {

	Platformer.Prefab.call(this, game_state, position, properties);

	this.walking_speed = properties.walking_speed;
	this.walking_distance = properties.walking_distance;
	this.score= +properties.score;
	

	this.previous_x = this.x;
	this.game_state.game.physics.arcade.enable(this);
	this.body.velocity.x = properties.direction* this.walking_speed;
	this.scale.setTo (-properties.direction,1);
	this.anchor.setTo(0.5);
	
};

Platformer.Enemy.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Enemy.prototype.constructor = Platformer.Enemy;

Platformer.Enemy.prototype.update = function () {

	this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

	if(Math.abs (this.x - this.previous_x)>= this.walking_distance){

		this.body.velocity.x *=  -1;
		this.previous_x = this.x;
		this.scale.setTo(-this.scale.x, 1);
	}
	
};