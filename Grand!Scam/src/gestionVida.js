export default class GestionVidas extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene)
        this.scene = scene;
        scene.add.existing(this);

        this.vidas = 3;
        this.aciertos = 0;
    }

    create() {

    }

    quitarVida() {
        this.vidas--;
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