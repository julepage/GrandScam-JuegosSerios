export default class GestionVidas extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene)
        this.scene = scene;
        scene.add.existing(this);

        this.vidas = 3;
        this.aciertos = 0;
        this.aciertosToWin = 10;
        this.velas = this.scene.add.image(this.scene.cameras.main.width / 1.165, this.scene.cameras.main.height / 1.745, 'velas').setScale(0.5, 0.5);
        this.vida3 = this.scene.add.image(this.scene.cameras.main.width / 70, this.scene.cameras.main.height / 1.075, 'vida').setScale(0.6, 0.6).setOrigin(0, 0.5);
        this.vida2 = this.scene.add.image(this.scene.cameras.main.width / 70, this.scene.cameras.main.height / 1.252, 'vida').setScale(0.6, 0.6).setOrigin(0, 0.5);
        this.vida1 = this.scene.add.image(this.scene.cameras.main.width / 70, this.scene.cameras.main.height / 1.5, 'vida').setScale(0.6, 0.6).setOrigin(0, 0.5);
        this.fuego1 = this.scene.add.sprite(this.scene.cameras.main.width / 1.1205, this.scene.cameras.main.height / 1.88, 'animFuego').setScale(0.5, 0.5);
        this.fuego2 = this.scene.add.sprite(this.scene.cameras.main.width / 1.1565, this.scene.cameras.main.height / 1.895, 'animFuego').setScale(0.5, 0.5);
        this.fuego3 = this.scene.add.sprite(this.scene.cameras.main.width / 1.1945, this.scene.cameras.main.height / 1.915, 'animFuego').setScale(0.5, 0.5);
        this.fuego1.anims.play('fuego');
        this.fuego2.anims.play('fuego');
        this.fuego3.anims.play('fuego');
        this.destVidas = [this.vida3, this.vida2, this.vida1];
        this.destFuegos = [this.fuego3, this.fuego2, this.fuego1];
        this.aciertosText = this.scene.add.text(this.scene.cameras.main.width / 20, this.scene.cameras.main.height / 3, this.aciertos, {
            fontSize: '80px',
            padding: { x: 20, y: 10 },
            color: '#ffffffff',
        }).setOrigin(0.5);
        this.scene.add.text(this.scene.cameras.main.width /20, this.scene.cameras.main.height / 2.8, "__", {
            fontSize: '80px',
            padding: { x: 20, y: 10 },
            color: '#ffffffff',
        }).setOrigin(0.5)
        this.scene.add.text(this.scene.cameras.main.width / 20, this.scene.cameras.main.height / 2.150, this.aciertosToWin, {
            fontSize: '80px',
            padding: { x: 20, y: 10 },
            color: '#ffffffff',
        }).setOrigin(0.5);
    }

    quitarVida() {
        this.vidas--;
        if (this.destVidas.length > 0) {
            this.destVidas[this.destVidas.length - 1]?.destroy();
            this.destVidas.pop();
        }
        if (this.destFuegos.length > 0) {
            this.destFuegos[this.destFuegos.length - 1]?.play('humo');
            if (this.destFuegos[this.destFuegos.length - 1] == this.fuego1)
                this.destFuegos[this.destFuegos.length - 1]?.setPosition(this.scene.cameras.main.width / 1.083, this.scene.cameras.main.height / 1.9);
            else if (this.destFuegos[this.destFuegos.length - 1] == this.fuego2)
                this.destFuegos[this.destFuegos.length - 1]?.setPosition(this.scene.cameras.main.width / 1.116, this.scene.cameras.main.height / 1.91);
            else if (this.destFuegos[this.destFuegos.length - 1] == this.fuego3)
                this.destFuegos[this.destFuegos.length - 1]?.setPosition(this.scene.cameras.main.width / 1.1525, this.scene.cameras.main.height / 1.92);
            this.destFuegos.pop();
        }
    }

    addAciertos() {
        this.aciertos++;
        this.aciertosText.setText(this.aciertos);
    }

    comprobar() {
        if (this.vidas == 0) {
            this.scene.scene?.stop('juego');
            this.scene.scene?.stop('movil');
            this.scene.scene?.stop('telefono');
            this.scene.scene.start('derrota', { win: false });
        }

        if (this.aciertos == this.aciertosToWin) {
            this.scene.scene?.stop('juego');
            this.scene.scene?.stop('movil');
            this.scene.scene?.stop('telefono');
            this.scene.scene.start('victoria', { win: true });
        }
    }
}