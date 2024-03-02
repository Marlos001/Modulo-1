import initAnimations from './playerAnims.js';
import collidable from '../mixins/collidable.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  static instanceCount = 0;

  constructor(scene, x, y) {
    super(scene, x, y, 'player_idle');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    Object.assign(this, collidable);
    this.projectiles = scene.physics.add.group();

    // Track how many players are in the scene
    Player.instanceCount++;

    this.init();
    this.initEvents();
  }

  init() {
    // Controls
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Player properties
    this.setDepth(1);
    this.gravity = 1000;
    this.body.setGravityY(this.gravity);

    this.playerSpeed = 250;
    this.jumpSpeed = 550;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.dashSpeed = 2000;
    this.canDash = false;
    this.dashDuration = 500;

    this.damage = 0;

    // Collider
    this.setSize(43, 65);
    this.body.setOffset(12, 0);
    // this.setCollideWorldBounds(true);

    // This if is just to not recreate animations.
    if (Player.instanceCount <= 1)
      initAnimations(this.scene.anims, this.selectedPlayer);
      
    // Emits an event when shooting a projectile
    this.shootEvent = new Phaser.Events.EventEmitter();
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.body) {
      const { left, right, down, up } = this.cursors;
      const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(this.spaceKey);
      const onFloor = this.body.blocked ? this.body.blocked.down : false;
      const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

      this.playerVelocityY = this.body.velocity.y;

      // Movement logic
      if (left.isDown) {
          this.setFlipX(true);
          this.setVelocityX(-this.playerSpeed);
          this.play('player_run', true);
      } else if (right.isDown) {
          this.setFlipX(false);
          this.setVelocityX(this.playerSpeed);
          this.play('player_run', true);
      } else {
          this.setVelocityX(0);
          this.play('player_idle', true);
      }

      // Jump logic
      if (isUpJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
        this.setVelocityY(-this.jumpSpeed);
        this.jumpCount++;
      }

      // Animation logic for jumping and falling
      if (!onFloor) {
        this.play('player_jump', true);
        if (this.playerVelocityY > 0)
          this.play('player_fall', true);
      }

      // Reset jump count
      if (onFloor) {
        this.jumpCount = 0;
      }

      // Shoot projectile when space is pressed
      if (isSpaceJustDown) {
        this.shootProjectile();
      }
    }
  }

  shootProjectile() {
    // Create a new projectile sprite
    const projectile = this.scene.physics.add.sprite(this.x, this.y, 'projectile').setScale(3);

    // Set the velocity of the projectile
    projectile.setVelocityX(550 * (this.flipX ? -1 : 1));

    // Emit the 'shoot' event with the projectile as an argument
    this.shootEvent.emit('shoot', projectile);

    // Destroy the projectile after a certain time
    this.scene.time.delayedCall(600, () => {
      projectile.destroy();
    });
}
}
