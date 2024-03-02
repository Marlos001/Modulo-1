export default (anims) =>{
    // Animate the sprites
    anims.create({
      key: 'player_run',
      frames: anims.generateFrameNumbers('playerGhost', { start: 6, end: 10 }),
      frameRate: 10,
      repeat: -1
    });
  
    anims.create({
      key: 'player_idle',
      frames: anims.generateFrameNumbers('playerGhost', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1
    });
  
    anims.create({
      key: 'player_jump',
      frames: anims.generateFrameNumbers('playerGhost', { start: 4, end: 4 }),
      frameRate: 2,
      repeat: -1
    });
  
    anims.create({
      key: 'player_fall',
      frames: anims.generateFrameNumbers('playerGhost', { start: 2, end: 3 }),
      frameRate: 6,
      repeat: -1
    });
  


  }
  