export default class Victoria extends Phaser.Scene {
    constructor() {
        super({ key: 'victoria' });
    }

    create() {
        //POSICION Y TAMAÑO DEL FONDO
        this.fondo = this.add.image(0, 0, 'fondoJuego');
        this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
        //FONDO TRANSLUCIDO
        const { width, height } = this.scale;
        this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.8).setOrigin(0);

        this.fondoV = this.add.image(0, 0, 'fondoVictoria').setInteractive({ useHandCursor: true });
        this.fondoV.setScale(this.cameras.main.height / this.fondo.height);
        this.fondoV.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        this.fondoV.on('pointerdown', () => {
            this.scene.start('menu');
        });
    }
}