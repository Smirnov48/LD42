class Manipulator {

	constructor(game, blockPool) {
		this.blockPool = blockPool;
		this.game = game;

		this.manipulator = game.add.image(32, 0, 'manipulator');
		this.manipulator.setOrigin(0.5, 0);

		this.curTime = 2000 + Math.random() * 5000;

		this.velocity = 4;

		this.catchedBlock = null;
		this.whereDrop = null;
	}

	update (time, delta) {
		this.manipulator.x += this.velocity;

		if (time > this.curTime) {
			this.curTime = time + 500 + Math.random() * 3000;
		}

		if (this.manipulator.x > 707 || this.manipulator.x < -33) {
			this.velocity = -this.velocity;
			if (!this.catchedBlock) {
				this.catchedBlock = new Block(this.game, this.manipulator.x, this.manipulator.y + 16);
				this.whereDrop = Math.floor(Math.random() * 18);
			}
		}

		if (
			this.catchedBlock && 
			this.manipulator.x % 32 == 0 && 
			Math.floor(this.manipulator.x / 32) == this.whereDrop
		) {
			this.catchedBlock.setPosition(this.manipulator.x, this.manipulator.y + 24);
			this.blockPool.add(this.catchedBlock);
			this.catchedBlock = false;
			this.whereDrop = null
		}

		if (this.catchedBlock) {
			this.catchedBlock.setPosition(this.manipulator.x, this.manipulator.y + 24);
		}
	}

}
