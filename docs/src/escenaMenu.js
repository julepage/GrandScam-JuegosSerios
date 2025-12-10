export default class EscenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }

    init() {
        // Idioma guardado (por defecto ES)
        this.idiomaActual = this.registry.get('idiomaSeleccionado') || 'es';
    }

    preload() {
        // Cargas de idioma
        this.load.json('es', 'assets/lang/es.json');
        this.load.json('en', 'assets/lang/en.json');
    }

    create() {
        this.game.audioManager.stopMusic();
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.music = this.game.audioManager.musica("musicaMenu");
        this.buttonEffect = this.game.audioManager.fx("buttonClick");
        this.music.play();

        this.teclaSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spaceEnabled = false;
        this.time.delayedCall(200, () => {
            this.spaceEnabled = true;
        });

        this.dibujarMenu();
    }

   
    dibujarMenu() {
        // Carga textos según idioma
        const textos = this.cache.json.get(this.idiomaActual);

        // Limpiar si se vuelve a generar
        this.fondo?.destroy();
        this.botonJugar?.destroy();
        this.botonTutorial?.destroy();
        this.contenedorIdioma?.destroy();

        // Fondo
        this.fondo = this.add.image(0, 0, 'fondoMenu');
        this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Estado del cuestionario
        const cuestionarioCompletado = this.registry.get('cuestionarioCompletado') ?? false;

        // Botón Jugar
        this.botonJugar = this.crearBotonConFlecha(
            width / 1.265,
            height * 3.65 / 7,
            textos.botones.jugar,
            () => {
                this.buttonEffect.play();
                this.cameras.main.fadeOut(1000);

                this.cameras.main.once('camerafadeoutcomplete', () => {
                    if (!cuestionarioCompletado) {
                        this.scene.start('cuestionario');
                    } else {
                        this.scene.stop('juego');
                        this.scene.start('juego');
                    }
                    this.music.stop();
                });
            }
        );

        // Botón Tutorial
        this.botonTutorial = this.crearBotonConFlecha(
            width / 1.265,
            height * 4.35 / 7,
            textos.botones.tutorial,
            () => {
                this.buttonEffect.play();
                this.cameras.main.fadeOut(1000);

                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('tutorial');
                    this.music.stop();
                });
            }
        );

    
        this.contenedorIdioma = this.add.container(
            width / 1.265,
            height * 5.05 / 7
        );

        // Botón ES
        this.botonES = this.crearBotonIdioma("ES", "es", -60, 0);

        // Botón EN
        this.botonEN = this.crearBotonIdioma("EN", "en", 60, 0);

        this.contenedorIdioma.add([this.botonES, this.botonEN]);

        this.actualizarColoresIdioma();
    }

 
    crearBotonIdioma(texto, langKey, offsetX, offsetY) {
        const boton = this.add.text(0, 0, texto, {
            fontSize: '60px',
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: '#ffffff',
            backgroundColor: '#444444',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        })
            .setOrigin(0.5)
            .setInteractive()
            .setScale(0.4);

        boton.x = offsetX;
        boton.y = offsetY;

        boton.on('pointerdown', () => {
            this.buttonEffect.play();

            if (this.idiomaActual !== langKey) {
                this.idiomaActual = langKey;
                this.registry.set('idiomaSeleccionado', langKey);
                this.dibujarMenu();
            }
        });

        boton.langKey = langKey;

        return boton;
    }

    actualizarColoresIdioma() {
        const gris = '#444444';
        const seleccionado = '#801736ff';

        this.botonES.setBackgroundColor(this.idiomaActual === "es" ? seleccionado : gris);
        this.botonEN.setBackgroundColor(this.idiomaActual === "en" ? seleccionado : gris);
    }

   
    update() {
        if (this.spaceEnabled && Phaser.Input.Keyboard.JustDown(this.teclaSpace)) {
            this.buttonEffect.play();
            this.scene.start('tutorial');
            this.music.stop();
        }
    }

  
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
