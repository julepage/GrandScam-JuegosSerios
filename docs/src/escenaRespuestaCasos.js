export default class RespuestaCasos extends Phaser.Scene {
    constructor() {
        super({ key: 'respuestaCasos' });
    }

    init(data) {
        this.respuesta = data.respuesta;
        this.textos = data.textos;
    }

    create() {
        // const textos = this.cache.json.get('es');
        // this.fondo = this.add.image(0, 0, 'fondoMenu');
        // this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        // this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        this.text =  this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, this.textos[this.respuesta].mIni, {
            fontSize: '100px',
            color: '#ff0000ff',
        }).setOrigin(0.5);
        if (this.respuesta == "acierto") {
           this.text.setColor('#5eff00ff');
        }
    }
}