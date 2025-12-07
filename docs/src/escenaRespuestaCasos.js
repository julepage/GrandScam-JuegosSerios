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
        this.rct = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.65).setOrigin(0);

        this.bckRct = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2.4, this.cameras.main.width / 1.25, this.cameras.main.height / 2, '#00ffffff', 1).setOrigin(0.5);
        // Botón
        this.text = this.autoFitText(this.textos[this.respuesta].mIni, this.cameras.main.width / 1.25, this.cameras.main.height / 2).setOrigin(0.5)
        this.text.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2.4)

        const boton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 1.35, 'CONTINUAR', {
            fontSize: '50px',
            backgroundColor: '#ff0000ff',
            padding: { x: 20, y: 10 },
            color: '#00FFFF',
        }).setOrigin(0.5).setInteractive();

        boton.on('pointerdown', () => {
            if (this.scene.isPaused('juego'))
                this.scene?.resume('juego');
            if (this.scene.isPaused('tutorial')){
                this.scene.get('tutorial').events.emit("tutorialFinalizado");
                this.scene?.resume('tutorial'); 
            }
            this.scene.stop(); 
            this.vidas.comprobar();
        });

        if (this.respuesta == "acierto") {
            this.text.setColor('#5eff00ff');
            boton.setStyle({ backgroundColor: '#5eff00ff', color: '#FF00FF'});
            this.bckRct.setFillStyle(0xFF00FF, 0.65);
        }
        else {
            this.text.setColor('#ff0000ff');
            this.bckRct.setFillStyle(0x00FFFF, 0.65);
        }

    }

    autoFitText(textString, width, height, maxFontSize = 100, minFontSize = 5) {
        let fontSize = maxFontSize;
        let textObj = this.add.text(0, 0, textString, {
            fontSize: fontSize + "px",
            wordWrap: { width: width },
        }).setOrigin(0);

        // Reducir tamaño hasta que quepa
        while (fontSize > minFontSize) {
            textObj.setFontSize(fontSize);

            // Si el texto cabe en alto y ancho
            if (textObj.width <= width && textObj.height <= height) {
                break;
            }

            fontSize--;
        }

        return textObj;
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER))) {
            if (this.scene.isPaused('juego'))
                this.scene?.resume('juego');
            if (this.scene.isPaused('tutorial')){
                this.scene.get('tutorial').events.emit("tutorialFinalizado");
                this.scene?.resume('tutorial');
            }
            this.scene.stop();
            this.vidas.comprobar();
        }
    }
}