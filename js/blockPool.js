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

		let lines = this.getFullLines();
		for (let line of lines) {
			for (let block of line) {
				block.destroy();
			}
		}
	}

	getBlockAt(x , y) {
		for (let k = 0; k < this.blocks.length; k++) {
			let block = this.blocks[k];

			if (Phaser.Geom.Rectangle.ContainsPoint(block.block.getBounds(), new Phaser.Geom.Point(x, y))){
				return block;
			}
		}

	}

	getFullLines() {
		let lines = new Array()
		for (let i = 1; i <= 10; i++) {
			let pY = 376 - 32 * i;

			let isFullLine = true;
			let line = new Array();
			for (let j = 1; j <= 19; j++) {
				let pX = 32 * j;

				let block = this.getBlockAt(pX, pY);
				if (!block || !block.atRest) {
					isFullLine = false;
					break;
				}
				line.push(block);
			}
			if (isFullLine) {
				//for (let bl of line) {
					//bl.block.setTint(0x44ff44);
				//}
				lines.push(line);
			}
		}
		return lines;
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