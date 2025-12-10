export default class RespuestaCasos extends Phaser.Scene {
    constructor() {
        super({ key: 'respuestaCasos' });
    }

    init(data) {
        this.respuesta = data.respuesta;
        this.textos = data.textos;
        this.vidas = data.vidas;
        this.musicaMenu = data.musica;
    }

    preload() {
        this.load.json('es', 'assets/lang/es.json');
        this.load.json('en', 'assets/lang/en.json');
    }

    create() {

        const lang = this.registry.get('idiomaSeleccionado') || 'es';

        //JSON cargado
        const json = this.cache.json.get(lang);
        this.textosBoton = json;

        this.buttonEffect = this.game.audioManager.fx("buttonClick");
        //Fondo negro translucido
        const { width, height } = this.scale;
        this.rct = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.65).setOrigin(0);
        // Botón
        const boton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 1.35, this.textosBoton.botones.continuar, {
            fontSize: '50px',
            backgroundColor: '#ff0000ff',
            padding: { x: 20, y: 10 },
            color: '#000000ff',
        }).setOrigin(0.5).setInteractive();

        boton.on('pointerdown', () => {
            this.buttonEffect.play();
            if (this.scene.isPaused('juego')) {
                this.scene?.resume('juego');
                this.musicaMenu.resume();
            }
            if (this.scene.isPaused('tutorial')) {
                this.scene.get('tutorial').events.emit("tutorialFinalizado");
                this.scene?.resume('tutorial');
            }
            this.scene.stop();
            this.vidas.comprobar();
        });

        if (this.respuesta == "acierto") {
            boton.setStyle({ backgroundColor: '#5eff00ff', color: '#000000ff' });
            this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.4, 'acierto').setOrigin(0.5).setScale(1.075);
            this.game.audioManager.fx("correct").play();
        }
        else {
            this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.4, 'fallo').setOrigin(0.5).setScale(1.075);
            this.game.audioManager.fx("incorrect").play();
        }

        this.text = this.autoFitText(this.textos[this.respuesta].mIni, this.cameras.main.width / 1.25, this.cameras.main.height / 2).setOrigin(0.5)
        this.text.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2.4)
        this.text.setColor('#000000ff');
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
            if (this.scene.isPaused('juego')) {
                this.scene?.resume('juego');
                this.musicaMenu.resume();
            }
            if (this.scene.isPaused('tutorial')) {
                this.scene.get('tutorial').events.emit("tutorialFinalizado");
                this.scene?.resume('tutorial');
            }
            this.scene.stop();
            this.vidas.comprobar();
        }
    }
}