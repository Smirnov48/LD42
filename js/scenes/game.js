class Game extends Phaser.Scene {

	constructor() {
		super( { key: 'Game', active: true });
	}

	preload() {
		this.load.image('block', 'assets/block.png')
	}

	create () {
//		this.cameras.main.setBounds(0, -1000, 640, 1360);
//		this.physics.world.setBounds(0, -1000, 640, 1360);
//		this.physics.world.OVERLAP_BIAS = 8;
		this.matter.world.setBounds(0, -1000, 640, 1360, 32, true, true, false, true);

//		var group = this.physics.add.group();
		for (var i = 0; i < 150; i++) {
//			group.create(Math.random() * 600, Math.random() * -900, 'block').setCollideWorldBounds(true);
		    this.matter.add.image(Math.random() * 600, Math.random() * -900, 'block');
		}
//		this.physics.add.collider(group);
	}

}