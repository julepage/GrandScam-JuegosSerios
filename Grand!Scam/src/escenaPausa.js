export default class EscenaPausa extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaPausa' });
    }

    create(){
    //FONDO TRANSLUCIDO
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.8).setOrigin(0);


    //POSICION Y TAMAÑO DEL FONDO
    this.fondo = this.add.image(0, 0, 'fondoPausa');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    //BOTONES 
    //CONTINUAR
     this.botonContinuar = this.add.sprite(this.cameras.main.width /2  , this.cameras.main.height/2, "boton").setInteractive().setScale(0.4).setDepth(1);
    this.botonContinuar.on('pointerdown', () => {
        this.scene.resume('juego');
        this.scene.stop(); // opcional: cierra la escena de pausa
    });
    
    this.botonContinuar.on('pointerover', () => {this.botonContinuar.setScale(0.45);});
    this.botonContinuar.on('pointerout', () => {this.botonContinuar.setScale(0.4);});
    //OPCIONES
    //MENU

  }
}