new Phaser.Game({
	width:640, 
	height:360, 
	type:Phaser.AUTO,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 300
			},
			debug: true
		}
	},
	backgroundColor:0xD0D0D0,
	scene: [Game, Menu]
});