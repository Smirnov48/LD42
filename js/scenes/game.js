class Game extends Phaser.Scene {

	constructor() {
		super( { key: 'Game', active: true });
	}

	preload() {

	}

	create () {
		this.add.text(80, 110, 'The game', { font: '96px Arial', fill: '#FF00FF' });	
	}

}