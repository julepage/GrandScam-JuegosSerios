export default class EscenaCarga extends Phaser.Scene {
  constructor() {
    super('carga');
  }

  preload() {
    //PROGRESS BAR
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const barWidth = this.cameras.main.width / 4;
    const barHeight = barWidth * 0.1;
    const barraFondo = this.add.rectangle(centerX, centerY, barWidth, barHeight, 0x555555);
    barraFondo.setOrigin(0.5, 0.5);
    const barraProgreso = this.add.rectangle(centerX - barWidth / 2, centerY, 0, barHeight, 0x00ff00);
    barraProgreso.setOrigin(0, 0.5);

    //TEXTO
    const textoPorcentaje = this.add.text(centerX, centerY + barHeight * 2, '0%', {
      fontSize: `${Math.max(16, this.cameras.main.width * 0.03)}px`,
      fill: '#ffffff'
    }).setOrigin(0.5);

    //BARRA AVANZA
    this.load.on('progress', (valor) => {
      barraProgreso.width = barWidth * valor;
      textoPorcentaje.setText(Math.floor(valor * 100) + '%');
    });

    //CAMBIO ESCENA
    this.load.on('complete', () => {
      textoPorcentaje.setText('¡Listo!');
      this.time.delayedCall(500, () => {
        this.scene.start('juego');
      });
    });

    //JSON CON TEXTOS
    this.load.json('es', 'assets/lang/es.json');
    //FONDO
    this.load.image('fondoJuego', './assets/fondoJuego.png');
    //IMAGENES
    this.load.image('botonPausa', './assets/pausa_boton.png');
    this.load.image('fondoPausa', './assets/pausaFondo.png');
    this.load.image('boton', './assets/boton.png');
    this.load.image('movilOff', './assets/movilOff.png');
    this.load.image('fondoMovil', './assets/fondo_movil.png');
    this.load.image('bocadilloG', './assets/respuestaGrande.png');
    this.load.image('bocadilloP', './assets/respuestaPeque.png');

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
    //---//
    this.load.spritesheet('animMovil', './assets/animMovil.png', {
      frameWidth: 274.28571428571428,
      frameHeight: 273
    });
  }
}

