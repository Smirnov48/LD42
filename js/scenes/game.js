class Game extends Phaser.Scene {

	constructor() {
		super( { key: 'Game', active: true });
	}

	preload() {
		this.load.image('block', 'assets/block.png')
	}

	create () {
		var group = this.physics.add.group();
		for (var i = 0; i < 200; i++) {
			group.create(Math.random() * 600, Math.random() * 100, 'block').setCollideWorldBounds(true);
		}
		this.physics.add.collider(group, group);
	}

}