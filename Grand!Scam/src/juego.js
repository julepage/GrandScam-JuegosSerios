export default class Juego extends Phaser.Scene {
  constructor() {
    super({ key: 'juego' });
  }

  preload() {
    this.load.image('fondoJuego', './assets/fondoJuego.png');
  }

  create() {
    // Instancias la imagen en 0,0 con origen arriba-izquierda
    this.fondo = this.add.image(0, 0, 'fondoJuego').setOrigin(0, 0);
    this.fondo.setDisplaySize(1567, 1080);
}


}
