export default class Juego extends Phaser.Scene {
  constructor() {
    super({ key: 'juego' });
  }

  preload() {
    this.load.image('fondoJuego', './assets/fondoJuego.png');
  }

  create() {
        this.fondo = this.add.image(0, 0, 'fondoJuego');

        this.fondo.setScale(this.cameras.main.height / this.fondo.height);

        this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
        
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    }
}
