export default class Juego extends Phaser.Scene {
  constructor() {
    super({ key: 'juego' });
  }

  preload() {
    this.load.image('fondoJuego', './assets/fondoJuego.png');
    this.load.spritesheet('animHumo', './assets/animHumo.png', {
       frameWidth: 274.28571428571428,
       frameHeight: 273
    });
  }

  create() {
        this.fondo = this.add.image(0, 0, 'fondoJuego');

        this.fondo.setScale(this.cameras.main.height / this.fondo.height);

        this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
        
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        this.anims.create({
          key: 'humo',
          frames: this.anims.generateFrameNumbers('animHumo', { start: 0, end: 11 }),
          frameRate: 10,
          repeat: -1
        });

        this.humo = this.add.sprite(this.cameras.main.width / 3.43, this.cameras.main.height / 1.54, 'animHumo');
        this.humo.anims.play('humo', true);
    }
}
