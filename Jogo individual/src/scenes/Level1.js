// Level1.js
import initEnemyAnimations from '../entities/enemyAnims.js';
import Enemy from "../entities/enemy.js";
import Player from "../entities/player.js";

export default class Level1 extends Phaser.Scene {
  constructor() {
    super("level1");
  }

  create() {

    this.score = 0;
    this.scoreText = this.add.text(-230, -150, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    this.scoreText.setDepth(1000);
    this.scoreText.setScrollFactor(0);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);

    // Create enemies group
    this.enemiesGroup = this.physics.add.group();

    

    // Add player sprite
    const player = this.createPlayer(playerZones).setScale(1.3);

    initEnemyAnimations(this.anims);

    player.shootEvent.on('shoot', (projectile) => {
        // Check collision between enemiesGroup and projectiles
        this.physics.add.collider(this.enemiesGroup, projectile, (enemy, projectile) => {
            // Reproduz a animação de morte do inimigo
            enemy.play('enemy_dead');

            enemy.setScale(1);

            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            // Destroi o projétil
            projectile.destroy();
            // Adiciona um atraso antes de destruir o sprite do inimigo
            setTimeout(() => {
                enemy.destroy();
            }, 4500); // Atraso de 1000 milissegundos (1 segundo)
        });
    });
    

    // Collider player with platforms
    this.createPlayerColliders(player, {
      colliders: {
        platforms: layers.platforms,
        playerZone: layers.playerZone
      }
    });

    this.createEndOfLevel(playerZones.end, player);
    this.setupFollowupCameraOn(player, map);

    // Check if player touches the bottom of the canvas
    this.checkPlayerBottom(player);

    // Create enemy colliders
    this.createEnemyColliders(this.enemiesGroup, {
        colliders: {
            platforms: layers.platforms
        }
    });

    // Check if 'Q' key is pressed to spawn enemies
    this.input.keyboard.on('keydown-Q', () => {
        this.spawnRandomEnemies();
    });
  }

  createPlayer({ start }) {
    return new Player(this, start.x, start.y, 'playerGhost');
  }
  

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setSize(5, 400)
      .setAlpha(0);

    this.physics.add.overlap(player, endOfLevel, () => {
      this.scene.start("gameOver", { player: player });
    });
  }

  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platforms);
    player.addCollider(colliders.playerZone);
  }

  createEnemyColliders(enemiesGroup, { colliders }) {
    this.physics.add.collider(enemiesGroup, colliders.platforms);
  }

  createMap() {
    const map = this.make.tilemap({ key: `level1` });
    map.addTilesetImage('TileSetX4', `TileSetX4`);
    return map;
  }

  createLayers(map) {
    const tileset1 = map.getTileset('TileSetX4');

    const platforms = map.createLayer('platforms', tileset1);
    const playerZones = map.getObjectLayer('player_zones');

    platforms.setCollisionByExclusion(-1, true);

    return { platforms, playerZones };
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find(zone => zone.name === 'startZone'),
      end: playerZones.find(zone => zone.name === 'endZone')
    };
  }

  setupFollowupCameraOn(player, map) {
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player, true);
    this.cameras.main.setZoom(0.5);
  }

  // Add a function to check if the player touches the bottom of the canvas
  checkPlayerBottom(player) {
    // Check player's position in update loop
    this.time.addEvent({
      loop: true,
      callback: () => {
        if (player.y >= 1300) {
          // Start the "gameOver" scene
          this.scene.start("gameOver", { player: player });
        }
      },
      delay: 100  // Check every 100 milliseconds
    });

    // Call the function to create enemies randomly every 10 seconds
    this.spawnEnemiesTimer = this.time.addEvent({
      delay: 10000, // 10 seconds
      loop: true,
      callback: this.spawnRandomEnemies,
      callbackScope: this
    });
  }

  spawnRandomEnemies() {
    const numEnemiesToSpawn = 3;
    const spawnAreaWidth = 3800; // Largura da área de spawn
    const spawnY = 50; // Coordenada Y fixa

    for (let i = 0; i < numEnemiesToSpawn; i++) {
      const randomX = Phaser.Math.RND.between(0, spawnAreaWidth);
      const enemy = new Enemy(this, randomX, spawnY);
      this.enemiesGroup.add(enemy);
      enemy.setSize(43, 65);
      enemy.body.setOffset(12, 0);
      enemy.setGravityY(100);
      enemy.setDepth(1);
      enemy.play('enemy_idle', true);
    }
    
  }
  
}
