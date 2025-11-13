export default class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorial' });
    }

    create() {
        const textos = this.cache.json.get('es');
        this.fondo = this.add.image(0, 0, 'fondoMenu');
        this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    }
}