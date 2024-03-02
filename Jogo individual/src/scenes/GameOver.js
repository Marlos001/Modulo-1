export default class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOver");
    }


preload() {
}
  
create() {
    this.bgOver = this.add.image(0, 0, "bgOver").setOrigin(0, 0);

    const retryButton = this.add.sprite(208, 180, 'retry', 0).setOrigin(0, 0);

    retryButton.setInteractive();
    retryButton.on('pointerover', () => {
        // Change the frame to 1 when mouse is over
        retryButton.setFrame(1);
    });

    retryButton.on('pointerout', () => {
        // Change the frame back to 0 when mouse is out
        retryButton.setFrame(0);
    });

    retryButton.on('pointerdown', () => {
      // Call the startGame function when the button is clicked
      this.preloadGame();
    });
    }

preloadGame() {
    this.scene.start("level1")
    }
}