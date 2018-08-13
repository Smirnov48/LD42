class Player {

	constructor(game, blockPool) {
		this.game = game;
		this.blockPool = blockPool;

		this.sprite = game.physics.add.sprite(100, 100 * Math.random(), 'player');
		this.sprite.setCollideWorldBounds(true);

		this.keys = this.game.input.keyboard.addKeys('W,A,S,D'); 
	}

	update(time, delta){
		if (this.sprite.body.touching.up) {
			this.died = true;
			this.sprite.setVelocityX(0);
			this.game.events.emit('died');
			this.sprite.anims.pause();
		}
		if (this.died){
			this.sprite.setScale(1.2, 0.1);
			return;
		}

		if (this.keys.W.isDown && (this.sprite.body.touching.down || this.sprite.y >= 326)) {
			this.sprite.setVelocityY(-210);
		}
		if (this.keys.S.isDown) {

		}
		if (this.keys.A.isDown) {
			this.sprite.play('run', true);
			this.sprite.setVelocityX(-120);
			this.sprite.setFlipX(true);
		} 
		if (this.keys.D.isDown) {
			this.sprite.play('run', true);
			this.sprite.setVelocityX(120);
			this.sprite.setFlipX(false);
		} 		

		if (!this.keys.A.isDown && !this.keys.D.isDown) {
			this.sprite.setVelocityX(0);
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