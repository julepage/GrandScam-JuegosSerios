import Bocadillos from "./bocadillos.js";

export default class EscenaTutorialMovil extends Phaser.Scene {
  constructor() {
    super({ key: 'tutorialMovil' });
  }

  init(data) {
    this.vidas = data.vidas;
    this.textos = data.textos;
  }

  create() {
    const { width, height } = this.scale;

    // Fondo negro general (si lo necesitas)
    this.capa = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 1).setOrigin(0);

    // Fondo negro independiente para el mensaje "lee y haz clic..."
    this.fondoMensaje = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.85)
      .setOrigin(0)
      .setDepth(10)
      .setInteractive(); // Bloquea clics detrás de esta capa

    // Fondo movil
    this.fondo = this.add.image(0, 0, 'fondoMovil');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2.3, this.cameras.main.height / 2);

    // Bocadillos
    this.bocadillos = new Bocadillos(this, this.textos.tutorial.movil.SMS, this.textos.tutorial.movil, this.vidas);
    this.bocadillos.ponerBocadillos(this.textos.tutorial.movil.SMS.comienzo.opciones);
    this.bocadillos.ponerTextos(this.textos.tutorial.movil.SMS.comienzo.opciones);

    // Texto centrado y saltable con ENTER
    this.instruccionTexto = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.textos.tutorial.bocadillos.respuestas,
      { fontSize: '45px', fill: '#ffffff', align: 'center', backgroundColor: '#000000' }
    ).setOrigin(0.5).setDepth(11);

    // Tecla ENTER para saltar el mensaje
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enter.on('down', () => {
      if (this.instruccionTexto) {
        this.instruccionTexto.destroy();
        this.fondoMensaje.destroy(); // solo destruye el fondo del mensaje
      }
    });
  }
}
