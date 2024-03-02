export default class TitleScreen extends Phaser.Scene {
    constructor() {
      super("titleScreen");
}
  
preload() {
    this.load.image('bg', 'assets/titleScreen/bgTitle.png');
    this.load.spritesheet("play", "assets/titleScreen/playButtom.png", { frameWidth: 192, frameHeight: 52 });
}
  
create() {
    this.bg = this.add.image(0, 0, "bg").setOrigin(0, 0);

    const playButton = this.add.sprite(208, 180, 'play', 0).setOrigin(0, 0);

    playButton.setInteractive();
    playButton.on('pointerover', () => {
        // Change the frame to 1 when mouse is over
        playButton.setFrame(1);
    });

    playButton.on('pointerout', () => {
        // Change the frame back to 0 when mouse is out
        playButton.setFrame(0);
    });

    playButton.on('pointerdown', () => {
      // Call the startGame function when the button is clicked
      this.preloadGame();
    });
    }

preloadGame() {
    this.scene.start("preload")
    }
}