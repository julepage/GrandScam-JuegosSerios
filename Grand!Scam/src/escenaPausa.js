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
        this.botonContinuar = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, textos.botones.continuar, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '150px',
            color: '#ff5100ff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setInteractive().setScale(0.4).setDepth(1);
        this.botonContinuar.setOrigin(0.5, 0.5);
        this.botonContinuar.on('pointerdown', () => {
            this.scene.resume('juego');
            this.scene.stop(); // opcional: cierra la escena de pausa
        });

        this.botonContinuar.on('pointerover', () => { this.botonContinuar.setStyle({ fontSize: '150px' }); });
        this.botonContinuar.on('pointerout', () => { this.botonContinuar.setStyle({ fontSize: '140px' }); });
        //OPCIONES
        //MENU

    }
    update() {
        // Revisar si se presionó ESC

        if (Phaser.Input.Keyboard.JustDown(this.teclaEsc)) {
            this.scene.stop();        // Cierra la escena de pausa
            this.scene.resume('juego'); // Reanuda el juego
        }
    }
}