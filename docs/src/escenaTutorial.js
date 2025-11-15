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
        //CREACION ANIMACIONES DEL JUEGO
        this.createAnims();

        //ANIM HUMO (SIEMPRE VA A ESTAR EN ESCENA)
        this.humo = this.add.sprite(this.cameras.main.width / 4.45, this.cameras.main.height / 1.52, 'animHumo');
        this.humo.anims.play('humo');

        //INSTANCIA DEL TELEFONO (ESTA FIJO PERO SIN ANIM)
        this.telefono = this.add.sprite(this.cameras.main.width / 1.25,
            this.cameras.main.height / 1.45, 'animTelefono').setInteractive();

        //PULSACION DEL BOTON TELEFONO
        this.telefono.on('pointerdown', () => {
            if (this.entraLLamada) {
                this.telefonoScene();
            }
        });

        //INSTANCIA DEL MOVIL (ESTA FIJO PERO SIN ANIM)
        this.movil = this.add.sprite(this.cameras.main.width / 2.94,
            this.cameras.main.height / 1.825, 'movilOff').setInteractive();

        //PULSACION DEL BOTON MOVIL
        this.movil.on('pointerdown', () => {
            if (this.entraMensaje) {
                this.movilScene();
            }
        });

        this.textos = this.cache.json.get('es');
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

    createAnims() {
        //CREACION DE ANIMS
        this.anims.create({
            key: 'humo',
            frames: this.anims.generateFrameNumbers('animHumo', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        //---//
        this.anims.create({
            key: 'fuego',
            frames: this.anims.generateFrameNumbers('animFuego', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        //---//
        this.anims.create({
            key: 'telefono',
            frames: this.anims.generateFrameNumbers('animTelefono', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        //---//
        this.anims.create({
            key: 'movil',
            frames: this.anims.generateFrameNumbers('animMovil', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
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

        //FLUJO JUEGO
        if (!this.entraLLamada && !this.entraMensaje) {
            const num = Phaser.Math.Between(0, 2);
            if (num == 0 && this.masLLamada) {
                this.entraLLamada = true;
                this.telefono.anims.play('telefono');
            }

            if (num == 1 && this.masMensaje) {
                this.entraMensaje = true;
                this.movil.anims.play('movil');
            }
        }

        if (!this.scene.isActive('tutorialTelefono') && !this.telefono.anims.isPlaying) {
            this.entraLLamada = false;
        }
        if (!this.scene.isActive('tutorialMovil') && !this.movil.anims.isPlaying) {
            this.entraMensaje = false;
            this.movil.setTexture('movilOff');
        }
    }
}