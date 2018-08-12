class Manipulator {

	constructor(game, blockPool) {
		this.blockPool = blockPool;
		this.game = game;

		this.manipulator = game.add.image(32, 0, 'manipulator');
		this.manipulator.setOrigin(0.5, 0);

		this.curTime = 2000 + Math.random() * 5000;

		this.velocity = 4;
	}

	update (time, delta) {
		this.manipulator.x += this.velocity;

		if (time > this.curTime) {
			this.curTime = time + 2000 + Math.random() * 5000;

			this.needReleaseBlock = true;
		}

		if (this.manipulator.x > 707 || this.manipulator.x < -33) {
			this.velocity = -this.velocity;
		}

		if (
			this.needReleaseBlock && 
			this.manipulator.x % 32 == 0 &&
			this.manipulator.x > 0 &&
			this.manipulator.x < 640
		){
			this.blockPool.createBlock(this.manipulator.x, this.manipulator.y + 16);
			this.needReleaseBlock = false;
		}
	}

}
