class Game extends Phaser.Scene {

	constructor() {
		super( { key: 'Game', active: true });
	}

	preload() {
		this.load.image('block', 'assets/block.png')
	}

	create () {
		this.add.image(100, 100, 'block');
	}

}