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
		this.load.bitmapFont('nokia', 'assets/nokia.png', 'assets/nokia.xml');
		this.load.spritesheet('switch', 'assets/switch.png', { frameWidth: 16, frameHeight: 32});		
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

		this.manipulators = new Array();
		this.manipulators.push(new Manipulator(this, this.blockPool, 4));

		this.events.on('died', this.onDied, this);

		this.leftSwitch = new Switch(this, 8, 360 - 32);
		this.rightSwitch = new Switch(this, 640 - 8, 360 - 32, true);

		this.score = new Score(this);

		this.sc5 =  false;
		this.sc15 =  false;
		this.sc30 =  false;
		this.sc50 =  false;
		this.lastscore = 100;

		let text = this.add.text(40, 120, 'Survive as logn as possible', { font: '48px Arial', fill: '#FF00FF' });
		this.tweens.add({
		    targets: text,
		    alpha: 0,
		    duration: 5000,
		    repeat: 0
		});
	}

	update(time, delta){
		if (this.score.score > 5 && !this.sc5) {
			this.sc5 = true;
			this.manipulators.push(new Manipulator(this, this.blockPool, 5));
		}

		if (this.score.score > 15 && !this.sc15) {
			this.sc15 = true;
			this.manipulators.push(new Manipulator(this, this.blockPool, 6));
		}
		if (this.score.score > 30 && !this.sc30) {
			this.sc30 = true;
			this.manipulators.push(new Manipulator(this, this.blockPool, 7));
		}

		if (this.score.score > 50 && !this.sc50) {
			this.sc50 = true;
			this.manipulators.push(new Manipulator(this, this.blockPool, 2));
			this.manipulators.push(new Manipulator(this, this.blockPool, 3));
		}
		
		if (this.score.score - this.lastscore > 100) {
			this.lastscore = this.score.score;

			this.manipulators.push(new Manipulator(this, this.blockPool, Math.random() * 15));
		}

		if (!this.player.died) {
			for (let manipulator of this.manipulators) {
				manipulator.update(time, delta);
			}
		}
		this.blockPool.update(time, delta);
		this.player.update(time, delta);

		let lines = this.blockPool.getFullLines();
		for (let line of lines) {
			this.events.emit('addScore', 100);
			this.cameras.main.shake(200);
			for (let block of line) {
				let deadBlock = this.physics.add.image(block.block.x, block.block.y, 'block', block.numberBlock).setScale(1.2,1.2);
				deadBlock.setVelocityX(Math.random() * 120 - 60);
				deadBlock.setVelocityY(- Math.random() * 120 - 100);

				this.blockPool.remove(block);
				block.destroy();
			}
		}
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