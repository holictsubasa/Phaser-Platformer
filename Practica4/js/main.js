var Platformer = Platformer || {};

Platformer.game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, '');

Platformer.game.state.add('Boot',Platformer.Boot);
Platformer.game.state.add('Loading',Platformer.Loading);
Platformer.game.state.add('Tiled',Platformer.Tiled);


Platformer.game.state.start('Boot', true, false, "assets/levels/level1.json");