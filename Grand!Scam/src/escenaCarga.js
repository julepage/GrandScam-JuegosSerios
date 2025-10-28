export default class EscenaCarga extends Phaser.Scene {
    constructor() {
        super('carga');
    }

    preload() {
        const barWidth = 400;
        const barHeight = 40;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const barraFondo = this.add.rectangle(centerX, centerY, barWidth, barHeight, 0x555555);
        barraFondo.setOrigin(0.5, 0.5);

        const barraProgreso = this.add.rectangle(centerX - barWidth / 2, centerY, 0, barHeight, 0x00ff00);
        barraProgreso.setOrigin(0, 0.5);

        const textoPorcentaje = this.add.text(centerX, centerY + 50, '0%', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.load.on('progress', (valor) => {
            barraProgreso.width = barWidth * valor;
            textoPorcentaje.setText(Math.floor(valor * 100) + '%');
        });

        this.load.on('complete', () => {
            textoPorcentaje.setText('¡Listo!');
            this.time.delayedCall(500, () => {
                this.scene.start('juego'); 
            });
        });

         //FONDO
        this.load.image('fondoJuego', './assets/fondoJuego.png');

        //SPRITESHEETS
        this.load.spritesheet('animHumo', './assets/animHumo.png', {
          frameWidth: 274.28571428571428,
          frameHeight: 273
        });

       //---//
       this.load.spritesheet('animTelefono', './assets/animTelefono.png', {
         frameWidth: 274.28571428571428,
         frameHeight: 273
       });
    }
}

