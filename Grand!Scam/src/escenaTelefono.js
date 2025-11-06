import Bocadillos from "./bocadillos.js";

export default class EscenaTelefono extends Phaser.Scene {
  constructor() {
    super({ key: 'telefono' });
  }

  create() {
    this.textos = this.cache.json.get('es');
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.5).setOrigin(0);

    //POSICION Y TAMAÑO DEL FONDO
    this.fondo = this.add.image(0, 0, 'fondoTelefono');
    this.fondo.setScale(window.innerHeight / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * window.innerHeight / this.fondo.height, window.innerHeight);
    this.fondo.setPosition(window.innerWidth / 2, window.innerHeight / 2);

    //Caso random
    this.randomCaso = Phaser.Math.RND.pick(Object.keys(this.textos.telefono.llamada));
    //poner bocadillos
    this.cuadro = this.add.image(window.innerWidth / 3 * 2, window.innerHeight / 4, 'cuadroTexto').setScale(0.5);
    this.bocadillos = new Bocadillos(this, 0, 0, this.textos.telefono.llamada[this.randomCaso], this.textos.telefono.llamada);
    this.bocadillos.ponerBocadillos(this.textos.telefono.llamada[this.randomCaso].comienzo.opciones);
    this.bocadillos.ponerTextos(this.textos.telefono.llamada[this.randomCaso].comienzo.opciones);
  }
}