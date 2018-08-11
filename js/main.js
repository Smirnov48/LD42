new Phaser.Game({
	width:640, 
	height:360, 
	type:Phaser.AUTO,
	physics: {
		default: 'matter',
		matter: {
			gravity: {
				y: 300
			},
			debug: false
		}
	},
	scene: [Game, Menu]
});