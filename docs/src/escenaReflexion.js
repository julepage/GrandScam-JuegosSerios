export default class EscneaReflexion extends Phaser.Scene {
    constructor() {
        super({ key: 'reflexion' });
    }

    init(data) {
        this.win = data.win;
    }

    create() {
        const lang = this.registry.get('idiomaSeleccionado') || 'es';

        //JSON cargado
        const json = this.cache.json.get(lang);
        this.textos = json;

        this.game.audioManager.stopMusic();
        this.buttonEffect = this.game.audioManager.fx("buttonClick");
        //this.victoria = this.game.audioManager.musica("victoria");
        //this.victoria.play();
        //POSICION Y TAMAÑO DEL FONDO
        this.fondo = this.add.image(0, 0, 'fondoJuego');
        this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        this.textToSet = this.textos.reflexion.victoria;
        if (!this.win) {
            this.textToSet = this.textos.reflexion.derrota;
            const boton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 1.35, this.textos.botones.restart, {
                fontSize: '50px',
                backgroundColor: '#613946ff',
                padding: { x: 20, y: 10 },
                color: '#000000ff',
            }).setOrigin(0.5).setInteractive();

            boton.on('pointerdown', () => {
                this.buttonEffect.play();
                this.scene.stop();
                this.scene.launch('menu');
            });
        }
        this.text = this.autoFitText(this.textToSet, this.cameras.main.width / 1.25, this.cameras.main.height / 2).setOrigin(0.5)
        this.text.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2.4)
        this.text.setColor('#000000ff');
        // this.fondoV = this.add.image(0, 0, 'fondoDerrota')
        // this.fondoV.setScale(this.cameras.main.height / this.fondo.height);
        // this.fondoV.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
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
}