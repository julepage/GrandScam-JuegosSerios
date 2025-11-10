import Bocadillos from "./bocadillos.js";

export default class EscenaTelefono extends Phaser.Scene {
  constructor() {
    super({ key: 'telefono' });
  }
  
  init(data){
    this.vidas = data.vidas;
  }

  create() {
    this.textos = this.cache.json.get('es');
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.5).setOrigin(0);

    //POSICION Y TAMAÑO DEL FONDO
    this.fondo = this.add.image(0, 0, 'fondoTelefono');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    //Caso random
    this.randomCaso = Phaser.Math.RND.pick(Object.keys(this.textos.telefono.llamada));
    //poner bocadillos
    this.bocadillos = new Bocadillos(this, this.textos.telefono.llamada[this.randomCaso], this.textos.telefono.llamada, this.vidas);
    this.bocadillos.ponerBocadillos(this.textos.telefono.llamada[this.randomCaso].comienzo.opciones);
    this.bocadillos.ponerTextos(this.textos.telefono.llamada[this.randomCaso].comienzo.opciones);
  }
}