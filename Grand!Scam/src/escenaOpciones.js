export default class EscenaOpciones extends Phaser.Scene {
    constructor() {
        super({ key: 'opciones' });
    }


    create() {

        //CARGAR TEXTOS
        const textos = this.cache.json.get('es');
        //FONDO TRANSLUCIDO
        const { width, height } = this.scale;
        this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.8).setOrigin(0);
        this.fondo = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'fondoOp'
        ).setOrigin(0.5).setScale(0.8);

        this.volver = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'volver', {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '150px',
            color: '#ff5100ff',
            stroke: '#561b00ff',
            strokeThickness: 6,
            align: 'center'
        })
            .setInteractive({ useHandCursor: true })
            .setScale(0.4)
            .setDepth(1)
            .setOrigin(0.5, 0.5);

        this.volver.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('EscenaPausa');
        });

        // PANTALLA COMPLETA
        const fullscreenButton = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 4, 'boton').setInteractive(); // Ajusta la escala si es necesario
        fullscreenButton.on('pointerup', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
            this.scale.on('resize', this.onResize, this);
        });


    }

    onResize(gameSize) {
        // Evita la recursión innecesaria
        if (gameSize.width !== this.game.config.width || gameSize.height !== this.game.config.height) {
            this.scale.setGameSize(window.innerWidth, window.innerHeight);
        }
    }
}