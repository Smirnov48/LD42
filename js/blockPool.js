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
		this.checkFullLine();
	}

	//getBlock 

	checkFullLine() {
		for (let i = 1; i <= 10; i++) {
			let pY = 376 - 32 * i;

			for (let j = 1; j <= 19; j++) {
				let pX = 32 * j;

				let hasBlockAtPoint = false;
				let block = null;
				for (let k = 0; k < this.blocks.length; k++) {
					block = this.blocks[k].block;

					if (Phaser.Geom.Rectangle.ContainsPoint(block.getBounds(), new Phaser.Geom.Point(pX, pY))){
						hasBlockAtPoint = true;
						break;
					}
				}

				if (!hasBlockAtPoint) {
					break;
				}
				block.setTint(0x44ff44);		
			}
		}
	}

	add(block) {
		block.setPool(this);
		this.blocks.push(block);
		if (this.group) {
			this.group.add(block.block);
		}
	}

	addGroup(group) {
		this.group = group;
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

}