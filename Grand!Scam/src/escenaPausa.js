export default class EscenaPausa extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaPausa' });
    }

    create() {
        //CARGAR TEXTOS
        const textos = this.cache.json.get('es');
        //FONDO TRANSLUCIDO
        const { width, height } = this.scale;
        this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.8).setOrigin(0);

        //POSICION Y TAMAÑO DEL FONDO
        this.fondo = this.add.image(0, 0, 'fondoPausa');
        this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        //BOTONES 
        // Detectar la tecla ESC
        this.teclaEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //CONTINUAR
        this.botonContinuar = this.crearBotonConFlecha(this.cameras.main.width / 2, this.cameras.main.height / 3, textos.botones.continuar,
            () => {
                this.scene.resume('juego');
                this.scene.stop(); // opcional: cierra la escena de pausa
            });

        //OPCIONES
        this.botonOpciones = this.crearBotonConFlecha(this.cameras.main.width / 2, this.cameras.main.height / 2, textos.botones.opciones,
            () => {
                //opciones
            });
        //MENU
        this.botonMenu = this.crearBotonConFlecha(this.cameras.main.width / 2, this.cameras.main.height / 3 * 2, textos.botones.menu,
            () => {
                //menu
            });
    }

    update() {
        // Revisar si se presionó ESC

        if (Phaser.Input.Keyboard.JustDown(this.teclaEsc)) {
            this.scene.stop();        // Cierra la escena de pausa
            this.scene.resume('juego'); // Reanuda el juego
        }
    }

    //METODO PARA CREAR BOTONES
    crearBotonConFlecha(x, y, texto, accion) {
        // Crear el texto del botón
        const boton = this.add.text(x, y, texto, {
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

        // Crear la flecha al lado izquierdo (inicialmente oculta)
        const flecha = this.add.image(
            boton.x - boton.displayWidth / 2 - 40,
            boton.y,
            'boton'
        ).setVisible(false).setScale(0.3).setDepth(1);

        // Crear la flecha al lado drch (inicialmente oculta)
        const flechaD = this.add.image(
            boton.x - boton.displayWidth / 2 + 40,
            boton.y,
            'boton'
        ).setVisible(false).setScale(0.3).setDepth(1).setFlipX(true);
;

        // Eventos del botón
        boton.on('pointerover', () => {
            boton.setStyle({ fontSize: '160px' });
            flecha.setPosition(boton.x - boton.displayWidth / 2 - 40, boton.y);
            flechaD.setPosition(boton.x + boton.displayWidth / 2 + 40, boton.y);
            flecha.setVisible(true);
            flechaD.setVisible(true);
        });

        boton.on('pointerout', () => {
            boton.setStyle({ fontSize: '150px' });
            flecha.setVisible(false);
            flechaD.setVisible(false);
        });

        boton.on('pointerdown', accion);//lo que hace cuando lo presionas

        return boton;
    }

}