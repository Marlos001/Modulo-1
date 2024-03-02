export default class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }
  
    preload() {

        
        this.load.spritesheet('retry', 'assets/titleScreen/retryButtom.png', { frameWidth: 192, frameHeight: 52 });
        this.load.image('bgOver', 'assets/titleScreen/bg.png');
    
        // Level1 load
        this.load.tilemapTiledJSON('level1', 'assets/level1/level1.json');
        this.load.image('TileSetX4', 'assets/tileset/TileSetX4.png');
        this.load.image('projectile', 'assets/projectile/Projectile.png');
  
  
        // Player load
        this.load.spritesheet("playerGhost", "assets/player/PlayerSpriteSheetCyberX4.png", { frameWidth: 64, frameHeight: 64 });

        // Enemy load
        this.load.spritesheet("enemy", "assets/enemy/spriteSheetCompletaEnemy.png", { frameWidth: 64, frameHeight: 64 });
  
        this.load.once('complete', () => {
        console.log('Assets Loaded');
        this.startGame();
      })
    }
  
    startGame() {
        console.log('Game Started');
        this.scene.start("level1")
    }
  }
  