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
        this.scene.start('menu');
      });
    });
    //SPRITESHEETS
    this.load.spritesheet('animHumo', './assets/animHumo.png', {
      frameWidth: 274.28571428571428,
      frameHeight: 273
    });

    //---//
    this.load.spritesheet('animFuego', './assets/animFuego.png', {
      frameWidth: 65,
      frameHeight: 72
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

    //JSON CON TEXTOS
    this.load.json('es', 'assets/lang/es.json');
    //FONDO
    this.load.image('fondoJuego', './assets/fondoJuego.png');
    //IMAGENES
    this.load.image('botonPausa', './assets/pausa_boton.png');
    this.load.image('fondoPausa', './assets/pausaFondo.png');
    this.load.image('fondoTelefono', './assets/fondoTelefono.png');
    this.load.image('fondoMenu', './assets/fondoMenu.png');
    this.load.image('boton', './assets/boton.png');
    this.load.image('movilOff', './assets/movilOff.png');
    this.load.image('fondoMovil', './assets/fondo_movil.png');
    this.load.image('bocadilloG', './assets/respuestaGrande.png');
    this.load.image('bocadilloP', './assets/respuestaPeque.png');
    this.load.image('cuadroTexto', './assets/cuadroTexto.png');
    this.load.image('fondoSMS', './assets/fondoSMS.png');
    this.load.image('fondoOp', './assets/opciones.png');
    this.load.image('fondoCorreo', './assets/fondoCorreo.png');
    this.load.image('vida', './assets/vidas.png');
    this.load.image('was', './assets/was.png');
    this.load.image('velas', './assets/velas.png');
    this.load.image('ventana1', './assets/ventana1.png');
    this.load.image('ventana2', './assets/ventana2.png');
    this.load.image('ventana3', './assets/ventana3.png');
    this.load.image('fondoC', './assets/fondoCuestionario.png');
    this.load.image('fondoVictoria', './assets/fondoVictoria.png');
    this.load.image('tutorialT', './assets/tutorialTele.png');
    this.load.image('tutorialM', './assets/tutorialMov.png');
  }

  create() {
    //CREACION ANIMACIONES DEL JUEGO
    this.createAnims();
  }

  createAnims() {
    //CREACION DE ANIMS
    this.anims.create({
      key: 'humo',
      frames: this.anims.generateFrameNumbers('animHumo', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    //---//
    this.anims.create({
      key: 'fuego',
      frames: this.anims.generateFrameNumbers('animFuego', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    //---//
    this.anims.create({
      key: 'telefono',
      frames: this.anims.generateFrameNumbers('animTelefono', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    //---//
    this.anims.create({
      key: 'movil',
      frames: this.anims.generateFrameNumbers('animMovil', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
  }
}

