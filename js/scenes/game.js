class Game extends Phaser.Scene {

	constructor() {
		super( { key: 'Game', active: true });
	}

	preload() {
		this.load.spritesheet('block', 'assets/block.png', { frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player', 'assets/player.png',  { frameWidth: 32, frameHeight: 65});
		this.load.spritesheet('playerIdle', 'assets/playerIdle.png',  { frameWidth: 32, frameHeight: 64});
		this.load.image('manipulator', 'assets/manipulator.png');
		this.load.image('wall', 'assets/wall.png');
	}

	create () {

		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('player', { start:0, end: 5}),
			frameRate: 6,
			repeat: -1
		});



		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('playerIdle', { start:0, end: 1}),
			frameRate: 6,
			repeat: -1
		});


		this.cameras.main.setBounds(0, 0, 640, 360);
		this.physics.world.setBounds(0, 0, 640, 360);

		this.walls = new Walls(this);

		this.blockPool = new BlockPool(this);
		this.player = new Player(this, this.blockPool);

		this.group = this.physics.add.staticGroup();
		this.physics.add.collider(this.player.sprite, this.group);

		this.blockPool.addGroup(this.group);
		this.manipulator = new Manipulator(this, this.blockPool);
	}

	update(time, delta){
		this.manipulator.update(time, delta);
		this.blockPool.update(time, delta);
		this.player.update(time, delta);
	}

}