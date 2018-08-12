class Block {

	constructor(game, x, y, blocksPool) {
		this.blocksPool = blocksPool;
		this.game = game;
		this.block = game.add.image(x, y, 'block');
	}

	update (time, delta) {
		this.block.y += 2;
		let collideBlock = this.blocksPool.getCollideObject(this);
		if (this.block.y > 344) { 
			this.block.y = 344;
		}
	}

}