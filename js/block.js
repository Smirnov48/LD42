class Block {

	constructor(game, x, y) {
		this.game = game;
		this.block = game.add.image(x, y, 'block');
	}

	update (time, delta) {
		this.block.y += 2;
	}

}