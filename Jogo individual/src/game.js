import Enemy from './entities/enemy.js';
import Player from './entities/player.js';
import TitleScreen from "./scenes/TitleScreen.js";
import Preload from "./scenes/Preload.js";
import Level1 from "./scenes/Level1.js";
import GameOver from "./scenes/GameOver.js";

// Phaser config to instanciate game
const WIDTH = 600;
const HEIGHT = 400;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT
}

const Scenes = [TitleScreen, Level1, Preload, GameOver];
const createScenes = Scene => new Scene(SHARED_CONFIG);
const initScene = () => Scenes.map(createScenes)

var config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
    }
  },
  pixelArt: true,
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true
    },
  scene: initScene()
};

var game = new Phaser.Game(config);
