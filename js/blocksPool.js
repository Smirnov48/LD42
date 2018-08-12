class BlockPool {

	constructor(game) {
		this.game = game;
		this.blocks = new Array();
	}

	createBlock (x, y) {
		let block = new Block(this.game, x, y);
		this.blocks.push(block);
	}

	update (time, delta) {
		for (let block of this.blocks) {
			block.update(time, delta);
		}
	}

}