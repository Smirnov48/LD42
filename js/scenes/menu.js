class Menu extends Phaser.Scene {

	constructor() {
		super( { key: 'Menu' });
	}

	preload() {

	}

	create () {
		this.add.text(80, 110, 'Start game', { font: '96px Arial', fill: '#FF00FF' });	
	}

}