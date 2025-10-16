import Juego from './juego.js';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false
    }
  },
  scene: [Juego]
};

window.game = new Phaser.Game(config);
