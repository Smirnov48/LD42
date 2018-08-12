class Block {

	constructor(game, x, y, blocksPool) {
		this.blocksPool = blocksPool;
		this.game = game;
		this.block = game.add.image(x, y, 'block');
	}

	update (time, delta) {
		this.block.y += 2;
		let collideBlock = this.blocksPool.getCollideObject(this);
		if (collideBlock) {
			this.block.y = collideBlock.block.y - 32;
		} else {
			if (this.block.y > 344) { 
				this.block.y = 344;
			}
		}
	}

	isCollide(otherBlock) {
		let a = this.block;
		let b = otherBlock.block;
		return a.x == b.x && a.y > b.y && a.y < b.y + 32;
	}

}