import Bocadillos from "./bocadillos.js";

export default class EscenaTelefono extends Phaser.Scene {
  constructor() {
    super({ key: 'telefono' });
  }

  init(data) {
    this.vidas = data.vidas;
    this.textos = data.textos;
    this.randomCaso = data.randomCaso;
    this.obligatorio = data.obligatorio;
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.5).setOrigin(0);

    //POSICION Y TAMAÑO DEL FONDO
    this.fondo = this.add.image(0, 0, 'fondoTelefono');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    //poner bocadillos
    console.log(this.randomCaso);
    if (this.randomCaso != " ") {
      if (this.obligatorio) {
        this.bocadillos = new Bocadillos(this, this.textos.telefono.llamada.obligatorio[this.randomCaso], this.textos.telefono.llamada, this.vidas);
        this.bocadillos.ponerBocadillos(this.textos.telefono.llamada.obligatorio[this.randomCaso].comienzo.opciones);
        this.bocadillos.ponerTextos(this.textos.telefono.llamada.obligatorio[this.randomCaso].comienzo.opciones);
      }
      else{
        this.bocadillos = new Bocadillos(this, this.textos.telefono.llamada.opcional[this.randomCaso], this.textos.telefono.llamada, this.vidas);
        this.bocadillos.ponerBocadillos(this.textos.telefono.llamada.opcional[this.randomCaso].comienzo.opciones);
        this.bocadillos.ponerTextos(this.textos.telefono.llamada.opcional[this.randomCaso].comienzo.opciones);
      }
    }
  }
}