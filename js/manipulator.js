class Manipulator {

	constructor(game) {
		var manipulator = game.physics.add.staticImage(32, 0, 'manipulator').setCollideWorldBounds(true);
		manipulator.setOrigin(0.5, 0);
	}

//	create (game) {
//	}

}