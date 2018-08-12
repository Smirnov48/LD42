class Block {

	constructor(game, x, y, blockPool, player) {
		this.blockPool = blockPool;
		this.game = game;
		this.block = game.physics.add.staticImage(x, y, 'block', Math.floor(Math.random() * 5) );
	}

	update (time, delta) {
		this.block.y += 2;
		let collideBlock = this.blockPool.getCollideObject(this);
		if (collideBlock) {
			this.block.y = collideBlock.block.y - 32;
		} else {
			if (this.block.y > 344) { 
				this.block.y = 344;
			}
		}
		this.block.refreshBody();
	}

	setPosition(x, y) {
		this.block.x = x;
		this.block.y = y;
	}

	setPool(blockPool) {
		this.blockPool = blockPool;
	} 

	isCollide(otherBlock) {
		let a = this.block;
		let b = otherBlock.block;
		return a.x == b.x && a.y > b.y && a.y < b.y + 32;
	}

}