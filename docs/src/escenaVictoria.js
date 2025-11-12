export default class Victoria extends Phaser.Scene {
    constructor() {
        super({ key: 'victoria' });
    }

    create() {
        //CARGAR TEXTOS
        const textos = this.cache.json.get('es');
        //FONDO TRANSLUCIDO
        const { width, height } = this.scale;
        this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.8).setOrigin(0);

        this.volver = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'VICTORIA', {
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

        this.volver.on('pointerdown', () => {
            this.scene.start('menu');
        });
    }
}