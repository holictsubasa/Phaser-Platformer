var Platformer = Platformer || {};

Platformer.RunningEnemy = function (game_state, position, properties) {

	Platformer.GroundEnemy.call(this, game_state, position, properties);
	this.detection_distance =+properties.detection_distance;
	this.running_speed =+ properties.running_speed;
	
};

Platformer.RunningEnemy.prototype = Object.create(Platformer.GroundEnemy.prototype);
Platformer.RunningEnemy.prototype.constructor = Platformer.RunningEnemy;

Platformer.RunningEnemy.prototype.update = function () {

var direction;
	this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

	if (this.detect_player()){
		if (this.game_state.prefabs.player.x < this.x)
			direction = -1;
		else
			direction = 1;

		this.body.velocity.x = direction* this.running_speed;
		this.scale.setTo(-direction,1);
		this.previous_x = this.x;


	}else {
		if (this.body.velocity.x < 0)
			direction = -1;
		else
			direction = 1;


		this.body.velocity.x = direction* this.walking_speed;
		this.scale.setTo(-direction,1);

		Platformer.GroundEnemy.prototype.update.call(this);
	}
	
};

Platformer.RunningEnemy.prototype.detect_player = function(){
	
		var distance;

		distance = Math.abs(this.x-this.game_state.prefabs.player.x);

		return (this.bottom === this.game_state.prefabs.player.bottom) && (distance <= this.detection_distance);






};