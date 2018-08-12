class BlockPool {

	constructor(game) {
		this.game = game;
		this.blocks = new Array();
		this.group = game.physics.add.staticGroup();
	}

	createBlock (x, y) {
		let block = new Block(this.game, x, y, this, this.player);
		this.group.add(block.block);
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

	setPlayer(player) {
		this.game.physics.add.collider(player, this.group, function (){
			console.log(1);
		});
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