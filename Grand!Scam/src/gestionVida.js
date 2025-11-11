export default class GestionVidas extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene)
        this.scene = scene;
        scene.add.existing(this);

        this.vidas = 3;
        this.aciertos = 0;
        this.vida3 = this.scene.add.image(this.scene.cameras.main.width / 70, this.scene.cameras.main.height / 1.075, 'vida').setScale(0.6, 0.6).setOrigin(0, 0.5);
        this.vida2 = this.scene.add.image(this.scene.cameras.main.width / 70, this.scene.cameras.main.height / 1.398, 'vida').setScale(0.6, 0.6).setOrigin(0, 0.5);
        this.vida1 = this.scene.add.image(this.scene.cameras.main.width / 70, this.scene.cameras.main.height / 2, 'vida').setScale(0.6, 0.6).setOrigin(0, 0.5);
        this.humo1 = this.scene.add.sprite(this.scene.cameras.main.width / 1.075, this.scene.cameras.main.height / 2, 'animHumo').setScale(0.5, 0.5);
        this.humo2 = this.scene.add.sprite(this.scene.cameras.main.width / 1.125, this.scene.cameras.main.height / 1.995, 'animHumo').setScale(0.5, 0.5);
        this.humo3 = this.scene.add.sprite(this.scene.cameras.main.width / 1.175, this.scene.cameras.main.height / 1.99, 'animHumo').setScale(0.5, 0.5);
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