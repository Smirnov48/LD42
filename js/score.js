class Score {

	constructor(game) {
		this.game = game;

		this.score = 0;

		this.scoreCount = game.add.bitmapText(10, 0, 'nokia', '0');
		this.scoreCount.depth = 200;
		this.scoreCount.setTint(0xFF2020);

		game.events.on('addScore', this.onScore, this);
	}

	onScore(value) {
		this.score += value;
		this.scoreCount.setText(this.score);
	}


}