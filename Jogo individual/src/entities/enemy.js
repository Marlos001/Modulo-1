import initEnemyAnimations from './enemyAnims.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Initialize enemy animations
    initEnemyAnimations(scene.anims);

    this.setSize(43, 65);
    this.body.setOffset(12, 0);

    // Gravity
    this.setGravityY(1000);

    this.setDepth(1);

    // Play idle animation by default
    this.play('enemy_idle', true);
  }


  update() {

  }
}
