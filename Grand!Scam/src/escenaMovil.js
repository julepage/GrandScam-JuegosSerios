import Bocadillos from "./bocadillos.js";

export default class EscenaMovil extends Phaser.Scene {
  constructor() {
    super({ key: 'movil' });
  }
  
  
  create() {
    const textos = this.cache.json.get('es');
    //Fondo negro translucido
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.5).setOrigin(0);
    //fondo movil
    this.fondo = this.add.image(0, 0, 'fondoMovil');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    
    //poner bocadillos
    this.bocadillos = new Bocadillos(this, 0, 0, textos.SMS.caso1.mIni);
    this.bocadillos.ponerBocadillos(textos.SMS.caso1.opciones);
  }

  update() {

  }
}