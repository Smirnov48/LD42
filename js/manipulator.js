class Manipulator {

	constructor(game, blockPool) {
		this.blockPool = blockPool;
		this.game = game;

		if (Math.random() > 0.5) {
			this.direction = 1;
			this.manipulator = game.add.image(660, 0, 'manipulator');
		} else {
			this.direction = -1;
			this.manipulator = game.add.image(-32, 0, 'manipulator');
		}

		this.manipulator.setOrigin(0.5, 0);
		this.manipulator.depth = 200;

		//MAX SPEED 31
		this.velocity = 3 * Math.random() + 1;

		this.catchedBlock = null;
		this.whereDrop = null;
	}

	update (time, delta) {
		this.manipulator.x += this.direction * this.velocity;

		if (this.manipulator.x > 707 || this.manipulator.x < -33) {
			this.direction = -this.direction;
			this.manipulator.x += this.direction * this.velocity;
			this.velocity = 5 * Math.random() + 1;
			
			if (!this.catchedBlock) {
				this.game.events.emit('addScore', 1);
				this.catchedBlock = new Block(this.game, this.manipulator.x, this.manipulator.y + 16);
				this.whereDrop = Math.floor(Math.random() * 19) + 1;
			}
		}

		if (
			this.catchedBlock && 
			this.manipulator.x % 32 < Math.abs(this.velocity) && 
			Math.floor(this.manipulator.x / 32) == this.whereDrop
		) {
			this.catchedBlock.setPosition(this.manipulator.x - this.manipulator.x % 32, this.manipulator.y + 32);
			this.blockPool.add(this.catchedBlock);
			this.catchedBlock = false;
			this.whereDrop = null
		}

		if (this.catchedBlock) {
			this.catchedBlock.setPosition(this.manipulator.x, this.manipulator.y + 32);
		}
	}

}
