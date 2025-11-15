export default class RespuestaCasos extends Phaser.Scene {
    constructor() {
        super({ key: 'respuestaCasos' });
    }

    init(data) {
        this.respuesta = data.respuesta;
        this.textos = data.textos;
        this.vidas = data.vidas;
    }

    create() {
        //Fondo negro translucido
        const { width, height } = this.scale;
        this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.5).setOrigin(0);

        // Botón
        this.text = this.add.text(this.cameras.main.width / 2, this.cameras.main.height * 2 / 5, this.textos[this.respuesta].mIni, {
            fontSize: '35px',
            color: '#ff0000ff',
        }).setOrigin(0.5);

        const boton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height * 3 / 5 + this.text.height, 'CONTINUAR', {
            fontSize: '28px',
            backgroundColor: '#ff0000ff',
            padding: { x: 20, y: 10 },
            color: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        boton.on('pointerdown', () => { this.scene.resume('juego'); this.scene.stop(); this.vidas.comprobar(); });

        if (this.respuesta == "acierto") {
            this.text.setColor('#5eff00ff');
            boton.setStyle({ backgroundColor: '#5eff00ff' });
        }

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER))) {
            this.scene.resume('juego'); this.scene.stop();
            this.vidas.comprobar();
        }
    }
}