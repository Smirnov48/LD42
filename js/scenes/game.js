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

		this.walls = new Walls(this);

		this.player = new Player(this);

		this.blockPool = new BlockPool(this);
		this.manipulator = new Manipulator(this, this.blockPool);
	}

	update(time, delta){
		this.manipulator.update(time, delta);
		this.blockPool.update(time, delta);
	}

}