export default class GestionVidas extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene)
        this.scene = scene;
        scene.add.existing(this);

        this.vidas = 3;
        this.aciertos = 0;
        this.vida3 = this.scene.add.image(this.scene.cameras.main.width / 70, this.scene.cameras.main.height / 1.075, 'vida').setScale(0.6, 0.6).setOrigin(0, 0.5);
        this.vida2 = this.scene.add.image(this.scene.cameras.main.width / 70, this.scene.cameras.main.height / 1.252, 'vida').setScale(0.6, 0.6).setOrigin(0, 0.5);
        this.vida1 = this.scene.add.image(this.scene.cameras.main.width / 70, this.scene.cameras.main.height / 1.5, 'vida').setScale(0.6, 0.6).setOrigin(0, 0.5);
        this.humo1 = this.scene.add.sprite(this.scene.cameras.main.width / 1.083, this.scene.cameras.main.height / 1.9, 'animHumo').setScale(0.5, 0.5);
        this.humo2 = this.scene.add.sprite(this.scene.cameras.main.width / 1.116, this.scene.cameras.main.height / 1.91, 'animHumo').setScale(0.5, 0.5);
        this.humo3 = this.scene.add.sprite(this.scene.cameras.main.width / 1.2, this.scene.cameras.main.height / 1.92, 'animHumo').setScale(0.5, 0.5);
        this.velas = this.scene.add.image(this.scene.cameras.main.width / 1.165, this.scene.cameras.main.height / 1.745, 'velas').setScale(0.5, 0.5);
        this.humo1.anims.play('humo');
        this.humo2.anims.play('humo');
        this.humo3.anims.play('humo');
        this.destVidas = [this.vida3, this.vida2, this.vida1];
        this.destHumos = [this.humo3, this.humo2, this.humo1];
    }

    quitarVida() {
        this.vidas--;
        if (this.destVidas.length > 0) {
            this.destVidas[this.destVidas.length - 1]?.destroy();
            this.destVidas.pop();
        }
        if (this.destHumos.length > 0) {
            this.destHumos[this.destHumos.length - 1]?.destroy();
            this.destHumos.pop();
        }
        console.log(this.vidas);
        if (this.vidas == 0) {
            this.scene.scene?.stop('juego');
            this.scene.scene?.stop('movil');
            this.scene.scene?.stop('telefono');
            this.scene.scene.start('derrota');
        }
    }

    addAciertos() {
        this.aciertos++;
        console.log(this.aciertos);
        if (this.aciertos == 10) {
            this.scene.scene?.stop('juego');
            this.scene.scene?.stop('movil');
            this.scene.scene?.stop('telefono');
            this.scene.scene.start('victoria');
        }
    }
}