export default class EscenaOpciones extends Phaser.Scene {
    constructor() {
        super({ key: 'opciones' });
    }


    create() {
        this.buttonEffect = this.game.audioManager.fx("buttonClick");
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
            color: '#471600ff',
            stroke: '#3e1401ff',
            strokeThickness: 6,
            align: 'center'
        })
            .setInteractive({ useHandCursor: true })
            .setScale(0.4)
            .setDepth(1)
            .setOrigin(0.5, 0.5);

        this.volver.on('pointerdown', () => {
            this.buttonEffect.play();
            this.scene.stop();
            this.scene.resume('EscenaPausa');
        });

        this.volver.on("pointerover", () => {
            this.volver.setStyle({ fontSize: '175px' });
        });

        this.volver.on("pointerout", () => {
            this.volver.setStyle({ fontSize: '150px' });
        });

        // PANTALLA COMPLETA
        const fullscreenButton = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 3, 'botonPantalla').setInteractive().setScale(0.5); // Ajusta la escala si es necesario
        fullscreenButton.on('pointerup', () => {
            this.buttonEffect.play();
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
            this.scale.on('resize', this.onResize, this);
        });

        fullscreenButton.on('pointerover', () => {
            fullscreenButton.setScale(0.55);
        });

        fullscreenButton.on('pointerout', () => {
            fullscreenButton.setScale(0.5);
        });

        //SLIDER MUSIC
        this.musicText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 1.575, 'MUSICA', {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '150px',
            color: '#471600ff',
            stroke: '#3e1401ff',
            strokeThickness: 6,
            align: 'center'
        })
            .setScale(0.2)
            .setDepth(1)
            .setOrigin(0.5, 0.5);

        const startX = this.cameras.main.width / 2 - this.cameras.main.width / 4.5;
        const startY = this.cameras.main.height / 1.5;
        const sliderLength = this.cameras.main.width / 4.5 * 2; 

        const track = this.add.graphics({ fillStyle: { color: 0xcccccc } });
        track.fillRect(startX, startY, sliderLength, 10);
        this.sliderTrack = { x: startX, width: sliderLength }; 


        const minX = startX;
        const maxX = startX + sliderLength;

        const thumb = this.add.graphics({ fillStyle: { color: 0xff0000 } });
        thumb.fillCircle(0, 0, 15);
        this.sliderThumb = thumb;

        this.sliderThumb.x = minX + this.game.audioManager.vM() * 2 * sliderLength;
        this.sliderThumb.y = startY;

        this.sliderThumb.setInteractive(new Phaser.Geom.Circle(0, 0, 15), Phaser.Geom.Circle.Contains);
        this.input.setDraggable(this.sliderThumb);

        this.valueText = this.add.text(startX + sliderLength + 20, startY, Math.floor(this.game.audioManager.vM() * 2 * 100), {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);

        this.sliderThumb.on('drag', (pointer, dragX, dragY) => {
            const clampedX = Phaser.Math.Clamp(dragX, minX, maxX);
            this.sliderThumb.x = clampedX;
            this.sliderThumb.y = startY; 

            const currentDistance = clampedX - minX;

            const normalizedValue = currentDistance / sliderLength;

            this.game.audioManager.volMusica(normalizedValue / 2);

            this.valueText.setText(Math.floor(normalizedValue * 100));
        });


        //SLIDER FX
         this.fxText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 1.35, 'EFECTOS', {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '150px',
            color: '#471600ff',
            stroke: '#3e1401ff',
            strokeThickness: 6,
            align: 'center'
        })
            .setScale(0.2)
            .setDepth(1)
            .setOrigin(0.5, 0.5);

        const startXFX = this.cameras.main.width / 2 - this.cameras.main.width / 4.5;
        const startYFX = this.cameras.main.height / 1.3;
        const sliderLengthFX = this.cameras.main.width / 4.5 * 2; 

        const trackFX = this.add.graphics({ fillStyle: { color: 0xcccccc } });
        trackFX.fillRect(startXFX, startYFX, sliderLengthFX, 10);
        this.sliderTrackFX = { x: startXFX, width: sliderLengthFX }; 


        const minXFX = startXFX;
        const maxXFX = startXFX + sliderLengthFX;

        const thumbFX = this.add.graphics({ fillStyle: { color: 0xff0000 } });
        thumbFX.fillCircle(0, 0, 15);
        this.sliderThumbFX = thumbFX;

        this.sliderThumbFX.x = minXFX + this.game.audioManager.vFx() * 1.5 * sliderLengthFX;
        this.sliderThumbFX.y = startYFX;

        this.sliderThumbFX.setInteractive(new Phaser.Geom.Circle(0, 0, 15), Phaser.Geom.Circle.Contains);
        this.input.setDraggable(this.sliderThumbFX);

        this.valueTextFX = this.add.text(startXFX + sliderLengthFX + 20, startYFX, Math.floor(this.game.audioManager.vFx() * 1.5 * 100), {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);

        this.sliderThumbFX.on('drag', (pointer, dragX, dragY) => {
            const clampedX = Phaser.Math.Clamp(dragX, minXFX, maxXFX);
            this.sliderThumbFX.x = clampedX;
            this.sliderThumbFX.y = startYFX; 

            const currentDistance = clampedX - minXFX;

            const normalizedValue = currentDistance / sliderLengthFX;

            this.game.audioManager.volFx(normalizedValue / 1.5);

            this.valueTextFX.setText(Math.floor(normalizedValue * 100));
        });
    }

    onResize(gameSize) {
        // Evita la recursión innecesaria
        if (gameSize.width !== this.game.config.width || gameSize.height !== this.game.config.height) {
            this.scale.setGameSize(window.innerWidth, window.innerHeight);
        }
    }
}