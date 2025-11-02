export default class EscenaTelefono extends Phaser.Scene {
  constructor() {
    super({ key: 'telefono' });
  }

  create(){
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.5).setOrigin(0);

    //POSICION Y TAMAÑO DEL FONDO
    this.fondo = this.add.image(0, 0, 'fondoTelefono');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
  }

}