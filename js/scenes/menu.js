class Menu extends Phaser.Scene {

	constructor() {
		super( { key: 'Menu' });
	}

	preload() {
		this.load.spritesheet('block', 'assets/block.png', { frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player', 'assets/player.png',  { frameWidth: 32, frameHeight: 65});
		this.load.spritesheet('playerIdle', 'assets/playerIdle.png',  { frameWidth: 32, frameHeight: 64});
		this.load.image('manipulator', 'assets/manipulator.png');
		this.load.image('wall', 'assets/wall.png');
	}

	create () {
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

		this.input.keyboard.on('keydown_SPACE', function () {
			this.scene.start('Game');
		}, this);
	}

	update(time, delta){
		this.manipulator.update(time, delta);
		this.blockPool.update(time, delta);

		let lines = this.blockPool.getFullLines();
		for (let line of lines) {
			for (let block of line) {
				this.blockPool.remove(block);
				block.destroy();
			}
		}

	}

}