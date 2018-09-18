class Menu extends Phaser.Scene {

	constructor() {
		super( { key: 'Menu' });
	}

	preload() {
		this.load.spritesheet('block', 'assets/block.png', { frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player', 'assets/player.png',  { frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('playerIdle', 'assets/playerIdle.png',  { frameWidth: 32, frameHeight: 64});
		this.load.image('manipulator', 'assets/manipulator.png');
		this.load.image('wall', 'assets/wall.png');
		this.load.audio('music', ['assets/music.mp3', 'assets/music.ogg']);
	}

	create () {
		this.music = this.sound.add('music');
		this.music.volume = 0.3;
		//this.music.play();

		this.cameras.main.setBounds(0, 0, 640, 360);
		this.physics.world.setBounds(0, 0, 640, 360);

		this.walls = new Walls(this);

		this.blockPool = new BlockPool(this);

		this.blockPool.addGroup(this.group);
		this.manipulator = new Manipulator(this, this.blockPool);

		this.add.text(60, 110, 'Stack Rush!', { font: '96px Arial', fill: '#FF00FF' }).depth = 200;;	

		let text = this.add.text(170, 230, 'press space to start', { font: '32px Arial', fill: '#FF00FF' }).setAlpha(0.1);
		this.tweens.add({
			targets: text,
			alpha: 1,
			duration: 500,
			yoyo: true,
			repeat: -1
		});
		text.depth = 200;

		this.add.text(210, 280, 'Conrols W,A,S,D', { font: '24px Arial', fill: '#FF00FF' });

		this.input.keyboard.on('keydown_SPACE', function () {
			this.scene.start('Game');
		}, this);
	}

	update(time, delta){
		this.manipulator.update(time, delta);
		this.blockPool.update(time, delta);

		let lines = this.blockPool.getFullLines();
		for (let line of lines) {
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

}