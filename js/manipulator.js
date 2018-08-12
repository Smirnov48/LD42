class Manipulator {

	constructor(game, blockPool) {
		this.blockPool = blockPool;
		this.game = game;

		this.manipulator = game.add.image(32, 0, 'manipulator');
		this.manipulator.setOrigin(0.5, 0);
		this.manipulator.depth = 200;

		this.velocity = 4;

		this.catchedBlock = null;
		this.whereDrop = null;
	}

	update (time, delta) {
		this.manipulator.x += this.velocity;

		if (this.manipulator.x > 707 || this.manipulator.x < -33) {
			this.velocity = -this.velocity;
			
			//let block = new Block(this.game, this.manipulator.x, this.manipulator.y + 16);
			//this.blockPool.group.add(block.block);
			if (!this.catchedBlock) {
				this.catchedBlock = new Block(this.game, this.manipulator.x, this.manipulator.y + 16);
				this.whereDrop = Math.floor(Math.random() * 18) + 1;
			}
		}
		if (
			this.catchedBlock && 
			this.manipulator.x % 32 == 0 && 
			Math.floor(this.manipulator.x / 32) == this.whereDrop
		) {
			this.catchedBlock.setPosition(this.manipulator.x, this.manipulator.y + 32);
			this.blockPool.add(this.catchedBlock);
			this.blockPool.group.add(this.catchedBlock.block);
			this.catchedBlock = false;
			this.whereDrop = null
		}

		if (this.catchedBlock) {
			this.catchedBlock.setPosition(this.manipulator.x, this.manipulator.y + 32);
		}
	}

}
