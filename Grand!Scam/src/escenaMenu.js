export default class EscenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }


    create() {
         const textos = this.cache.json.get('es');
        this.fondo = this.add.image(0, 0, 'fondoMenu');
        this.fondo.setScale(window.innerHeight / this.fondo.height);
        this.fondo.setDisplaySize(this.fondo.width * window.innerHeight / this.fondo.height, window.innerHeight);
        this.fondo.setPosition(window.innerWidth / 2, window.innerHeight / 2);

        this.teclaSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.botonJugar = this.crearBotonConFlecha(window.innerWidth / 1.37, window.innerHeight / 2, textos.botones.jugar,
            () => {
                this.scene.launch('juego');
            });
    }

    update() {
        // Revisar si se presionó ESC

        if (Phaser.Input.Keyboard.JustDown(this.teclaSpace)) {
            this.scene.launch('juego'); // Reanuda el juego
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
            boton.setStyle({ fontSize: '160px' });
        });

        boton.on('pointerout', () => {
            boton.setStyle({ fontSize: '150px' });
        });

        boton.on('pointerdown', accion);//lo que hace cuando lo presionas

        return boton;
    }

}
