export default (anims) => {
    // Verifica se a animação já existe antes de criar
    if (!anims.exists('enemy_run')) {
        anims.create({
            key: 'enemy_run',
            frames: anims.generateFrameNumbers('enemy', { start: 24, end: 28 }),
            frameRate: 10,
            repeat: -1
        });
    }

    if (!anims.exists('enemy_idle')) {
        anims.create({
            key: 'enemy_idle',
            frames: anims.generateFrameNumbers('enemy', { start: 16, end: 17 }),
            frameRate: 6,
            repeat: -1
        });
    }

    if (!anims.exists('enemy_hit')) {
        anims.create({
            key: 'enemy_hit',
            frames: anims.generateFrameNumbers('enemy', { start: 8, end: 9 }),
            frameRate: 2,
            repeat: -1
        });
    }

    if (!anims.exists('enemy_dead')) {
        anims.create({
            key: 'enemy_dead',
            frames: anims.generateFrameNumbers('enemy', { start: 0, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
    }
}
