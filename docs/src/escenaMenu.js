export default class EscenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }


    create() {
        const textos = this.cache.json.get('es');
        this.fondo = this.add.image(0, 0, 'fondoMenu');
        this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        const cuestionarioCompletado = this.registry.get('cuestionarioCompletado') ?? false;
        this.c = cuestionarioCompletado;//niapa
        this.teclaSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.botonJugar = this.crearBotonConFlecha(this.cameras.main.width / 1.265, this.cameras.main.height * 3.65/7, textos.botones.jugar,
            () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0); // (duración, r, g, b)

                this.cameras.main.once('camerafadeoutcomplete', () => {
                    if (!cuestionarioCompletado) {
                        this.scene.start('cuestionario');
                    }
                    else {
                        this.scene.stop('juego');
                        this.scene.start('juego');
                    }
                });

            });

        this.botonTutorial = this.crearBotonConFlecha(this.cameras.main.width / 1.265, this.cameras.main.height *4.35/7, textos.botones.tutorial,
            () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0); // (duración, r, g, b)

                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('tutorial');
                });

            });
    }

    update() {
        // Revisar si se presionó Enter

        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER))) {
            if (!this.c) {
                this.scene.start('cuestionario');
            }
            else {
                this.scene.start('juego');
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclaSpace)) {
            this.scene.start('tutorial');
        }
    }

    //METODO PARA CREAR BOTONES
    crearBotonConFlecha(x, y, texto, accion) {
        // Crear el texto del botón
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



        // Eventos del botón
        boton.on('pointerover', () => {
            boton.setStyle({ fontSize: '160px', color: '#ffd500ff' });
        });

        boton.on('pointerout', () => {
            boton.setStyle({ fontSize: '150px', color: '#f8f8f8ff' });
        });

        boton.on('pointerdown', accion);//lo que hace cuando lo presionas
        // Dentro de tu escena actual


        return boton;
    }

}
