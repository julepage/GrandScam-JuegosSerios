export default class EscenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }

    create() {
        this.game.audioManager.stopMusic();
        const textos = this.cache.json.get('es');
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.music = this.game.audioManager.musica("musicaMenu");
        this.buttonEffect = this.game.audioManager.fx("buttonClick");
        this.music.play()
        // Fondo
        this.fondo = this.add.image(0, 0, 'fondoMenu');
        this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        // Estado del cuestionario
        const cuestionarioCompletado = this.registry.get('cuestionarioCompletado') ?? false;
        this.c = cuestionarioCompletado;

        // Teclas
        //this.teclaEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.teclaSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Desactivar temporalmente la detección de teclas
        this.enterEnabled = false;
        this.spaceEnabled = false;

        // Habilitar las teclas después de un pequeño delay (200 ms)
        this.time.delayedCall(200, () => {
            this.enterEnabled = true;
            this.spaceEnabled = true;
        });

        // Botón Jugar
        this.botonJugar = this.crearBotonConFlecha(
            this.cameras.main.width / 1.265,
            this.cameras.main.height * 3.65 / 7,
            textos.botones.jugar,
            () => {
                this.buttonEffect.play();
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    if (!cuestionarioCompletado) {
                        this.scene.start('cuestionario');
                        this.music.stop()
                    } else {
                        this.scene.stop('juego');
                        this.scene.start('juego');
                        this.music.stop()
                    }
                });
            }
        );

        // Botón Tutorial
        this.botonTutorial = this.crearBotonConFlecha(
            this.cameras.main.width / 1.265,
            this.cameras.main.height * 4.35 / 7,
            textos.botones.tutorial,
            () => {
                this.buttonEffect.play();
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('tutorial');
                    this.music.stop()
                });
            }
        );
    }

    update() {
        // // Revisar teclas solo si ya se habilitaron
        // if (this.enterEnabled && Phaser.Input.Keyboard.JustDown(this.teclaEnter)) {
        //     if (!this.c) {
        //         this.scene.start('cuestionario');
        //     } else {
        //         this.scene.start('juego');
        //     }
        // }

        if (this.spaceEnabled && Phaser.Input.Keyboard.JustDown(this.teclaSpace)) {
            this.buttonEffect.play();
            this.scene.start('tutorial');
            this.music.stop()
        }
    }

    // Método para crear botones
    crearBotonConFlecha(x, y, texto, accion) {
        const boton = this.add.text(x, y, texto, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '150px',
            color: '#f8f8f8ff',
            stroke: '#310015ff',
            strokeThickness: 6,
            align: 'center'
        })
            .setInteractive({ useHandCursor: true })
            .setScale(0.4)
            .setDepth(1)
            .setOrigin(0.5, 0.5);

        boton.on('pointerover', () => {
            boton.setStyle({ fontSize: '160px', color: '#ffd500ff' });
        });

        boton.on('pointerout', () => {
            boton.setStyle({ fontSize: '150px', color: '#f8f8f8ff' });
        });

        boton.on('pointerdown', accion);

        return boton;
    }
}
