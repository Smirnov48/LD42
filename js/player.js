class Player {

	constructor(game, blockPool) {
		this.game = game;
		this.blockPool = blockPool;
		this.sprite = game.physics.add.image(100, 100 * Math.random(), 'player').setCollideWorldBounds(true);


		this.keys = this.gamed.input.keyboard.addKeys('W,A,S,D'); 
	}

	update(time, delta){

		if (this.keys.W.isDown) {

		}
		if (this.keys.A.isDown) {
			this.sprite.x -= 1;			
		}
		if (this.keys.S.isDown) {

		}
		if (this.keys.D.isDown) {
			this.sprite.x += 1;			
		}

	}

}