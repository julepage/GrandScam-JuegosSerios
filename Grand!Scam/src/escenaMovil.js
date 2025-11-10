import Bocadillos from "./bocadillos.js";

export default class EscenaMovil extends Phaser.Scene {
  constructor() {
    super({ key: 'movil' });
  }

  init(data) {
    this.vidas = data.vidas;
  }

  create() {
    this.textos = this.cache.json.get('es');
    //Fondo negro translucido
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.5).setOrigin(0);
    //fondo movil
    this.fondo = this.add.image(0, 0, 'fondoMovil');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    //Caso y aplicacion random
    this.randomApp = Phaser.Math.RND.pick(Object.keys(this.textos.movil));
    this.randomCaso = Phaser.Math.RND.pick(Object.keys(this.textos.movil[this.randomApp]));
    //poner bocadillos
    this.bocadillos = new Bocadillos(this, this.textos.movil[this.randomApp][this.randomCaso], this.textos.movil[this.randomApp], this.vidas);//hasta caso1
    this.bocadillos.ponerBocadillos(this.textos.movil[this.randomApp][this.randomCaso].comienzo.opciones);
    this.bocadillos.ponerTextos(this.textos.movil[this.randomApp][this.randomCaso].comienzo.opciones);
  }
}