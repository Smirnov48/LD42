class Game extends Phaser.Scene {

	constructor() {
		super( { key: 'Game', active: true });
	}

	preload() {
		this.load.image('block', 'assets/block.png');
		this.load.image('player', 'assets/player.png');
	}

	create () {
		this.cameras.main.setBounds(0, -1000, 640, 1360);
		this.physics.world.setBounds(0, -1000, 640, 1360);
//		this.physics.world.OVERLAP_BIAS = 8;
//		this.matter.world.setBounds(0, -1000, 640, 1360, 32, true, true, false, true);

		var group = this.physics.add.group();
		for (var i = 0; i < 50; i++) {
			group.create(Math.random() * 600, Math.random() * -900, 'block').setCollideWorldBounds(true);
//		    this.matter.add.image(Math.random() * 600, Math.random() * -900, 'block');
		}
		this.physics.add.collider(group);

		var player = this.physics.add.image(100, 100, 'player').setCollideWorldBounds(true);
		this.physics.add.collider(player, group);
	}

}