import GestionVida from "./gestionVida.js";

export default class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorial' });
    }

    create() {
        this.entraLLamada = false;
        this.entraMensaje = false;
        this.masLLamada = true;
        this.masMensaje = true;
        this.obLlamada = true;
        this.obMovil = true;
        // Dentro del create() de la nueva escena
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        //VENTANA
        this.scrollSpeed = 0.4; // velocidad del movimiento (ajústala)
        this.ventana1 = this.add.image(0, 0, 'ventana1').setOrigin(0, 0);
        this.ventana2 = this.add.image(this.ventana1.width, 0, 'ventana2').setOrigin(0, 0);
        this.ventana3 = this.add.image(this.ventana1.width * 2, 0, 'ventana3').setOrigin(0, 0);

        //POSICION Y TAMAÑO DEL FONDO
        this.fondo = this.add.image(0, 0, 'fondoJuego');
        this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        this.vidas = new GestionVida(this);

        //ANIM HUMO (SIEMPRE VA A ESTAR EN ESCENA)
        this.humo = this.add.sprite(this.cameras.main.width / 4.45, this.cameras.main.height / 1.52, 'animHumo');
        this.humo.anims.play('humo');


        //TEXTOS TUTORIAL
        this.instruccionTexto;
        this.capa;

        //INSTANCIA DEL TELEFONO (ESTA FIJO PERO SIN ANIM)
        this.telefono = this.add.sprite(this.cameras.main.width / 1.25,
            this.cameras.main.height / 1.45, 'animTelefono').setInteractive();


        //PULSACION DEL BOTON TELEFONO
        this.telefono.on('pointerdown', () => {
            if (this.entraLLamada) {
                this.instruccionTexto.destroy();
                this.capa.destroy();
                this.telefonoScene();
            }
        });

        //INSTANCIA DEL MOVIL (ESTA FIJO PERO SIN ANIM)
        this.movil = this.add.sprite(this.cameras.main.width / 2.94,
            this.cameras.main.height / 1.825, 'movilOff').setInteractive();

        //PULSACION DEL BOTON MOVIL
        this.movil.on('pointerdown', () => {
            if (this.entraMensaje) {
                this.instruccionTexto.destroy();
                this.capa.destroy();
                this.movilScene();
            }
        });

        this.textos = this.cache.json.get('es');
        this.empieza = false;
        this.fin = false;
        this.mensajeFinMostrado = false;

        this.mensaje1 = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 4, this.textos.tutorial.bocadillos.titulo, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '200px',
            color: '#ff5100ff',
            stroke: '#561b00ff',
            strokeThickness: 10,
            backgroundColor: '#000000', // fondo negro
            align: 'center'
        }).setScale(0.4).setDepth(1).setOrigin(0.5, 0.5);


    }

    //CAMBIOS ESCENAS
    telefonoScene() {
        this.telefono.stop();
        this.telefono.setFrame(0);
        this.masLLamada = false;
        this.scene.launch('tutorialTelefono', { vidas: this.vidas, textos: this.textos });
    }
    movilScene() {
        this.movil.stop();
        this.movil.setFrame(0);
        this.masMensaje = false;
        this.scene.launch('tutorialMovil', { vidas: this.vidas, textos: this.textos });
    }

    update() {
        // MOVIMIENTO CONTINUO DEL CIELO (se laggeeeeea)
        this.ventana1.x -= this.scrollSpeed;
        this.ventana2.x -= this.scrollSpeed;
        this.ventana3.x -= this.scrollSpeed;
        // Reposicionar si alguna sale completamente a la izquierda
        if (this.ventana1.x + this.ventana1.width <= 0) {
            this.ventana1.x = Math.max(this.ventana2.x, this.ventana3.x) + this.ventana1.width;
        }
        if (this.ventana2.x + this.ventana2.width <= 0) {
            this.ventana2.x = Math.max(this.ventana1.x, this.ventana3.x) + this.ventana2.width;
        }
        if (this.ventana3.x + this.ventana3.width <= 0) {
            this.ventana3.x = Math.max(this.ventana1.x, this.ventana2.x) + this.ventana3.width;
        }


        this.time.delayedCall(2000, () => {
            this.mensaje1.destroy();
            this.empieza = true;
        }, [], this);

        //FLUJO JUEGO
        if (this.empieza) {

            if (!this.entraLLamada && !this.entraMensaje) {
                const num = Phaser.Math.Between(0, 2);
                if (num == 0 && this.masLLamada) {
                    this.entraLLamada = true;
                    this.telefono.anims.play('telefono');

                    this.capa = this.add.image(0, 0, 'tutorialT');
                    this.capa.setScale(this.cameras.main.height / this.fondo.height);
                    this.capa.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

                    this.instruccionTexto = this.add.text(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY - 200, // un poco arriba del centro
                        this.textos.tutorial.bocadillos.telefono,
                        { fontSize: '48px', fill: '#ffffff' }
                    ).setOrigin(0.5);


                }

                if (num == 1 && this.masMensaje) {
                    this.entraMensaje = true;
                    this.movil.anims.play('movil');

                    this.capa = this.add.image(0, 0, 'tutorialM');
                    this.capa.setScale(this.cameras.main.height / this.fondo.height);
                    this.capa.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

                    this.instruccionTexto = this.add.text(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY - 200, // un poco arriba del centro
                        this.textos.tutorial.bocadillos.movil,
                        { fontSize: '48px', fill: '#ffffff' }
                    ).setOrigin(0.5);

                }
            }

            if (!this.scene.isActive('tutorialTelefono') && !this.telefono.anims.isPlaying) {
                this.entraLLamada = false;
            }
            if (!this.scene.isActive('tutorialMovil') && !this.movil.anims.isPlaying) {
                this.entraMensaje = false;
                this.movil.setTexture('movilOff');
            }

            if (!this.masLLamada && !this.masMensaje && !this.scene.isActive('tutorialMovil') && !this.scene.isActive('tutorialTelefono')) {
                this.fin = true;
            }
        }
        if (this.fin && !this.mensajeFinMostrado) {
            this.mensajeFinMostrado = true;

            this.capa1 = this.add.image(0, 0, 'tutorialV');
            this.capa1.setScale(this.cameras.main.height / this.fondo.height);
            this.capa1.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

            this.flecha = this.add.image(0, 0, 'flecha');
            this.flecha.setScale(this.cameras.main.height / this.fondo.height);
            this.flecha.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 3);

            this.instruccionTexto1 = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 200, // un poco arriba del centro
                this.textos.tutorial.bocadillos.vidas,
                { fontSize: '48px', fill: '#ffffff', align: 'center',  backgroundColor: '#000000'  }
            ).setOrigin(0.5);


            this.time.delayedCall(9000, () => {
                //borro anterior
                this.instruccionTexto1.destroy();
                this.flecha.destroy();
                //nuevaflecha
                this.flecha = this.add.image(0, 0, 'flechaA');
                this.flecha.setScale(this.cameras.main.height / this.fondo.height);
                this.flecha.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 3);
                //bton pausa
                this.botonPausa = this.add.sprite(this.cameras.main.width / 20, 60, "botonPausa").setInteractive().setScale(0.4).setDepth(1);
                //texto explicando el boton de pausa
                this.textoPausa = this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY - 200,
                    this.textos.tutorial.bocadillos.pausa,
                    { fontSize: '48px', fill: '#ffffff', align: 'center', backgroundColor: '#000000'  }
                ).setOrigin(0.5);

                // Opcional: destruir después de X segundos si quieres que desaparezca solo
                this.time.delayedCall(12000, () => {
                    this.capa1.destroy();
                    this.flecha.destroy();
                    this.textoPausa.destroy();
                    this.botonPausa.destroy();
                    this.flecha.destroy();

                    //FONDO TRANSLUCIDO
                    const { width, height } = this.scale;
                    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.8).setOrigin(0);

                    this.textoPausa = this.add.text(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY,
                       this.textos.tutorial.bocadillos.resumen,
                        { fontSize: '48px', fill: '#ffffff', align: 'center', backgroundColor: '#000000' }
                    ).setOrigin(0.5);

                    this.time.delayedCall(9000, () => {
                        this.scene.stop('tutorial'); // detiene la escena actual o una diferente
                        this.scene.start('menu'); // inicia la nueva
                    }, [], this);

                }, [], this);


            }, [], this);
        }

    }
}