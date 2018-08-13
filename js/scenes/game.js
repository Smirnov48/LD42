class Game extends Phaser.Scene {

	constructor() {
		super( { key: 'Game'});
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
		this.manipulator2 = new Manipulator(this, this.blockPool);
		this.manipulator3 = new Manipulator(this, this.blockPool);
		this.manipulator4 = new Manipulator(this, this.blockPool);
		this.manipulator5 = new Manipulator(this, this.blockPool);
		this.manipulator6 = new Manipulator(this, this.blockPool);
		this.manipulator7 = new Manipulator(this, this.blockPool);
		this.manipulator8 = new Manipulator(this, this.blockPool);
		this.manipulator9 = new Manipulator(this, this.blockPool);
		this.manipulator0 = new Manipulator(this, this.blockPool);

		this.events.on('died', this.onDied, this);
	}

	update(time, delta){
		if (!this.player.died) {
			this.manipulator.update(time, delta);
			this.manipulator2.update(time, delta);
			this.manipulator3.update(time, delta);
			this.manipulator4.update(time, delta);
			this.manipulator5.update(time, delta);
			this.manipulator6.update(time, delta);
			this.manipulator7.update(time, delta);
			this.manipulator8.update(time, delta);
			this.manipulator9.update(time, delta);
			this.manipulator0.update(time, delta);
		}
		this.blockPool.update(time, delta);
		this.player.update(time, delta);
	}

	onDied() {
		this.add.text(66, 130, 'Game Over', { font: '96px Arial', fill: '#FF00FF' });
		let text = this.add.text(160, 230, 'press space to restart', { font: '32px Arial', fill: '#FF00FF' }).setAlpha(0.1);
		this.tweens.add({
		    targets: text,
		    alpha: 1,
		    duration: 500,
		    yoyo: true,
		    repeat: -1
		});
		this.input.keyboard.on('keydown_SPACE', function () {
			this.scene.restart();
		}, this);
	}

}