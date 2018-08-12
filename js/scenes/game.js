class Game extends Phaser.Scene {

	constructor() {
		super( { key: 'Game', active: true });
	}

	preload() {
		this.load.image('block', 'assets/block.png');
		this.load.image('player', 'assets/player.png');
		this.load.image('manipulator', 'assets/manipulator.png');
	}

	create () {
		this.cameras.main.setBounds(0, -1000, 640, 1360);
		this.physics.world.setBounds(0, -1000, 640, 1360);
		for (var i = 0; i < 50; i++) {
			new Block(this);
		}

		new Player(this);
		this.manipulator = new Manipulator(this);
	}

	update(time, delta){
		this.manipulator.update(time, delta);
	}

}