class Block {

	constructor(game, x, y) {
		this.block = game.physics.add.image(x, y, 'block').setCollideWorldBounds(true);
	}

	setVelocityX (velocityX) {
		this.block.setVelocityX(velocityX);
	}

}