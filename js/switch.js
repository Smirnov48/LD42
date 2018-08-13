class Switch {

	constructor(game, x, y, flip) {
		this.game = game;
		this.sprite = game.add.image(x, y, 'switch').setFlipX(flip);
	}

}