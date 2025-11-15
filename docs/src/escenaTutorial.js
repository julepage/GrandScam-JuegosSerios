export default class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorial' });
    }

    create() {
        const textos = this.cache.json.get('es');
        // this.ventana2 = this.add.image(640, 0, 'ventana2').setOrigin(0, 0);
        // this.fondo = this.add.image(0, 0, 'fondoJuego');
        // this.fondo.setScale(this.scene.cameras.main.height / this.fondo.height);
        // this.fondo.setPosition(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2);
        // this.vidas = new GestionVida(this);
        // //INSTANCIA DEL TELEFONO (ESTA FIJO PERO SIN ANIM)
        // this.telefono = this.add.sprite(this.scene.cameras.main.width / 1.25,
        //     this.cameras.main.height / 1.45, 'animTelefono').setInteractive();
        // this.movil = this.add.sprite(this.scene.cameras.main.width / 2.94,
        //     this.cameras.main.height / 1.825, 'movilOff').setInteractive();
    }
}