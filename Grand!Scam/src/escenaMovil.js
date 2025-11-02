export default class EscenaMovil extends Phaser.Scene {
  constructor() {
    super({ key: 'movil' });
  }

  create(){
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.5).setOrigin(0);
  }

}