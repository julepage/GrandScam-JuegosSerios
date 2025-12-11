import Bocadillos from "./bocadillos.js";

export default class EscenaTutorialTelefono extends Phaser.Scene {
  constructor() {
    super({ key: 'tutorialTelefono' });
  }

  init(data) {
    this.vidas = data.vidas;
    this.textos = data.textos;
  }

  create() {
    const { width, height } = this.scale;

    //si es movil
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Fondo general (opcional)
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 1).setOrigin(0);

    // Fondo telefono
    this.fondo = this.add.image(0, 0, 'fondoTelefono');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    // Bocadillos
    this.bocadillos = new Bocadillos(this, this.textos.tutorial.telefono, this.textos.tutorial.telefono, this.vidas);
    this.bocadillos.ponerBocadillos(this.textos.tutorial.telefono.comienzo.opciones);
    this.bocadillos.ponerTextos(this.textos.tutorial.telefono.comienzo.opciones);

    // Fondo negro independiente para el mensaje "lee y haz clic..."
    this.fondoMensaje = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.85)
      .setOrigin(0)
      .setDepth(10)
      .setInteractive(); // bloquea clics detrás

    // Texto centrado y saltable con ENTER
    this.instruccionTexto = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.textos.tutorial.bocadillos.respuestas,
      { fontSize: '50px', fill: '#ffffff', align: 'center', backgroundColor: '#000000' }
    ).setOrigin(0.5).setDepth(11);

    // Tecla ENTER para saltar el mensaje
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enter.on('down', () => {
      if (this.instruccionTexto) this.instruccionTexto.destroy();
      if (this.fondoMensaje) this.fondoMensaje.destroy();
    });

    if (this.isMobile) {
      this.input.on('pointerdown', () => {
        if (this.instruccionTexto) {
          this.instruccionTexto.destroy();
          this.fondoMensaje.destroy();
        }
      });
    }
  }
}
