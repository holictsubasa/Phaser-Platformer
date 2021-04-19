var Platformer = Platformer || {};

Platformer.Checkpoint = function (game_state, position, properties) {
	Platformer.Prefab.call(this, game_state, position, properties);

	this.checkpoint_reached= false;

	this.game_state.game.physics.arcade.enable(this);
	this.anchor.setTo(0.5);
	//	this.body.allowGravity = false;
	
};

Platformer.Checkpoint.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Checkpoint.prototype.constructor = Platformer.Checkpoint;

Platformer.Checkpoint.prototype.update = function () {

	this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

	this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_checkpoint, null,this);
	
};


Platformer.Checkpoint.prototype.reach_checkpoint = function () {
	this.checkpoint_reached = true;
};