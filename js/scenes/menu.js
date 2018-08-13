class Menu extends Phaser.Scene {

	constructor() {
		super( { key: 'Menu' });
	}

	preload() {

	}

	create () {
		this.add.text(80, 110, 'Blocker', { font: '96px Arial', fill: '#FF00FF' });	

		let text = this.add.text(160, 230, 'press space to start', { font: '32px Arial', fill: '#FF00FF' }).setAlpha(0.1);
		this.tweens.add({
			targets: text,
			alpha: 1,
			duration: 500,
			yoyo: true,
			repeat: -1
		});

		this.input.keyboard.on('keydown_SPACE', function () {
			this.scene.start('Game');
		}, this);
	}

}