class Player {

	constructor(game, blockPool) {
		this.game = game;
		this.blockPool = blockPool;

		this.sprite = game.physics.add.sprite(100, 100 * Math.random(), 'player').setCollideWorldBounds(true);

		this.keys = this.game.input.keyboard.addKeys('W,A,S,D'); 
	}

	update(time, delta){

		let collideObject = this.blockPool.collidePlayer(this);

		if (this.keys.W.isDown && this.sprite.y >= 326) {
			this.sprite.setVelocityY(-210);
		}
		if (this.keys.S.isDown) {

		}
		if (this.keys.A.isDown) {
			this.sprite.play('run', true);
			this.sprite.x -= 2;
			if (collideObject) {
				this.sprite.x += 2;
			}
			this.sprite.setFlipX(true);
		} 
		if (this.keys.D.isDown) {
			this.sprite.play('run', true);
			this.sprite.x += 2;
			if (collideObject) {
				this.sprite.x -= 2;
			}
			this.sprite.setFlipX(false);
		} 		

		if (collideObject) {
			this.sprite.y = collideObject.y - 16;
		}

		if (
			!this.keys.W.isDown &&
			!this.keys.A.isDown &&
			!this.keys.S.isDown &&
			!this.keys.D.isDown
		) {
			this.sprite.play('idle', true);
		}

	}

}