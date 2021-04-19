var Platformer = Platformer || {};

Platformer.Goal = function (game_state, position, properties) {
	Platformer.Prefab.call(this, game_state, position, properties);

	this.next_level = properties.next_level;

	this.game_state.game.physics.arcade.enable(this);
	this.anchor.setTo(0.5);

};

Platformer.Goal.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Goal.prototype.constructor = Platformer.Goal;

Platformer.Goal.prototype.update = function () {

	this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

	this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
};

Platformer.Goal.prototype.reach_goal = function () {

	this.game_state.game.state.start ("Boot", true, false, this.next_level);
};

