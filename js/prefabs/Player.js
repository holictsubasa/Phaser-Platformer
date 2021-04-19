var Platformer = Platformer || {};

var marcador;
var letras;
Platformer.Player = function (game_state, position, properties) {

		Platformer.Prefab.call(this, game_state, position, properties);

		this.playerScore = 0;
		var text = "0";
		var style = {font: "20px Arial", fill: "#fff", align: "center"};
		this.scoreLabel = this.game.add.text(this.game.width/50+50,this.game.height/50,text,style);
		this.game.add.text(this.game.width/50-15,this.game.height/50,"Score:",style);

		this.walking_speed = +properties.walking_speed;
		this.jumping_speed = +properties.jumping_speed;
		this.bouncing = +properties.bouncing;

		this.game_state.game.physics.arcade.enable (this);

		this.body.collideWorldBounds = true;

		this.animations.add("walking", [0,1,2,1], 6, true);
		this.frame=3;

		this.anchor.setTo (0.5);

		this.cursors = this.game_state.game.input.keyboard.createCursorKeys();

};

Platformer.Player.prototype.init = function () {
		
		
};



Platformer.Player.prototype.create = function(){

	
		

}
Platformer.Player.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Player.prototype.constructor = Platformer.Player;


Platformer.Player.prototype.hit_enemy = function (player, enemy) {

	if (enemy.body.touching.up){
		enemy.kill();
		player.y -= this.bouncing;
		this.playerScore += enemy.score;
	    this.scoreLabel.text = this.playerScore;
	}

	else {
		this.game_state.restart_level();
	}
    
};

Platformer.Player.prototype.update = function () {
    this.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game.physics.arcade.collide(this, this.game_state.groups.enemies, this.hit_enemy, null, this);
   
    if (this.cursors.right.isDown && this.body.velocity.x >= 0){
    	this.body.velocity.x= this.walking_speed;
    	this.animations.play("walking");
    	this.scale.setTo(-1,1);
	} else if (this.cursors.left.isDown && this.body.velocity.x <= 0){
    	this.body.velocity.x= -this.walking_speed;
    	this.animations.play("walking");
    	this.scale.setTo(1,1);
	}
	else {
    	this.body.velocity.x= 0;
    	this.animations.stop();
    	this.frame=3;
	}


	if (this.cursors.up.isDown && this.body.blocked.down){
		this.body.velocity.y = -this.jumping_speed;
	}


	if (this.bottom >= this.game_state.game.world.height){
		this.game_state.restart_level();
	}


};

