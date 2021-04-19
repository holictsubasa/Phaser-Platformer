var Platformer = Platformer || {};

var score = 0;
var marcador;
var letras;
Platformer.Player = function (game_state, position, properties) {

		this.marcador;
		this.score=0;


		Platformer.Prefab.call(this, game_state, position, properties);

			style = {font: "15px Arial", fill: "#fff", align:"center"};

		letras = this.game.add.text(40,10,"Score: ",style);
		letras.anchor.set(0.5);

		marcador = this.game.add.text(80,10,score,style);
		marcador.anchor.set(0.5);

		var score = 0;

		this.marcador;

		this.score=0;

		//


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
		//score++;
		score+=enemy.score;
		marcador.setText(score);
		//solo agreguè esto para ver si aumentaba el score en la consola, no es necesario
		//console.log(score);


		player.y -= this.bouncing;
	}

	else {
		this.game_state.restart_level();
	}
    
};

Platformer.Player.prototype.collect_coin = function (coin, player) {

		coin.kill();
		//score++;
		score+=coin.score;
		marcador.setText(score);
    
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

