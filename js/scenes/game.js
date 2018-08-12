class Game extends Phaser.Scene {

	constructor() {
		super( { key: 'Game', active: true });
	}

	preload() {
		this.load.image('block', 'assets/block.png');
		this.load.image('player', 'assets/player.png');
		this.load.image('manipulator', 'assets/manipulator.png');
		this.load.image('wall', 'assets/wall.png');
	}

	create () {
		this.cameras.main.setBounds(0, 0, 640, 360);
		this.physics.world.setBounds(0, 0, 640, 360);

		new Walls(this);

		new Player(this);
		this.manipulator = new Manipulator(this);
	}

	update(time, delta){
		this.manipulator.update(time, delta);
	}

}