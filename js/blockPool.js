class BlockPool {

	constructor(game) {
		this.game = game;
		this.blocks = new Array();
	}

	createBlock (x, y) {
		let block = new Block(this.game, x, y, this);
		this.blocks.push(block);
	}

	update (time, delta) {
		for (let block of this.blocks) {
			block.update(time, delta, this);
		}
	}

	add(block) {
		block.setPool(this);
		this.blocks.push(block);
	}

	getCollideObject (currentBlock) {
		for (let block of this.blocks) {
			if (block != currentBlock) {
				if (block.isCollide(currentBlock)) {
					return block;
				}
			}
		}
		return false;
	}

	collidePlayer(player) {
		for (let block of this.blocks) {
			let rect1 = player.sprite;
			let rect2 = block.block;

			if (
				rect1.x < rect2.x + rect2.width &&
				rect1.x + rect1.width > rect2.x &&
				rect1.y < rect2.y + rect2.height &&
				rect1.height + rect1.y > rect2.y
			) {
				return block;
			}
		}	
		return false;	
	}

}