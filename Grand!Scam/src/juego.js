export default class Juego extends Phaser.Scene {
  constructor() {
    super({ key: 'juego' });
    this.entraLLamada = false;
    this.entraMensaje = false;
  }

  create() {
    // Dentro del create() de la nueva escena
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    //POSICION Y TAMAÑO DEL FONDO
    this.fondo = this.add.image(0, 0, 'fondoJuego');
    this.fondo.setScale(window.innerHeight / this.fondo.height);
    this.fondo.setPosition(window.innerWidth / 2, window.innerHeight / 2);

    // Detectar la tecla ESC
    this.teclaEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    //CREACION ANIMACIONES DEL JUEGO
    this.createAnims();

    //ANIM HUMO (SIEMPRE VA A ESTAR EN ESCENA)
    this.humo = this.add.sprite(window.innerWidth / 3.43, window.innerHeight / 1.54, 'animHumo');
    this.humo.anims.play('humo');

    //INSTANCIA DEL TELEFONO (ESTA FIJO PERO SIN ANIM)
    this.telefono = this.add.sprite(window.innerWidth / 1.335,
      window.innerHeight / 1.54, 'animTelefono').setInteractive();

    //PULSACION DEL BOTON TELEFONO
    this.telefono.on('pointerdown', () => {
      if (this.entraLLamada) {
        this.telefonoScene();
      }
    });

    //INSTANCIA DEL MOVIL (ESTA FIJO PERO SIN ANIM)
    this.movil = this.add.sprite(window.innerWidth / 2.65,
      window.innerHeight / 1.95, 'movilOff').setInteractive();

    //PULSACION DEL BOTON MOVIL
    this.movil.on('pointerdown', () => {
      if (this.entraMensaje) {
        this.movilScene();
      }
    });

    //BOTON PAUSA
    this.botonPausa = this.add.sprite(window.innerWidth / 20, 60, "botonPausa").setInteractive().setScale(0.4).setDepth(1);
    this.botonPausa.on('pointerdown', () => {
      this.escenaPausa();
    });

    this.botonPausa.on('pointerover', () => { this.botonPausa.setScale(0.45); });
    this.botonPausa.on('pointerout', () => { this.botonPausa.setScale(0.4); });

  }

  //CAMBIOS ESCENAS
  telefonoScene() {
    this.telefono.stop();
    this.telefono.setFrame(0);
    this.scene.launch('telefono');
  }
  movilScene() {
    this.movil.stop();
    this.movil.setFrame(0);
    this.scene.launch('movil');
  }
  escenaPausa() {
    this.scene.launch('EscenaPausa');
    this.scene.pause();
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

  update() {
    if (!this.entraLLamada && !this.entraMensaje) {
      const num = Phaser.Math.Between(0, 2);
      if (num == 0) {
        this.entraLLamada = true;
        this.telefono.anims.play('telefono');
      }

      if (num == 1) {
        this.entraMensaje = true;
        this.movil.anims.play('movil');
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.teclaEsc)) {
      // Acción al presionar ESC
      this.scene.pause();              // Pausa la escena actual
      this.scene.launch('EscenaPausa'); // Abre tu escena de pausa
    }
    if (!this.scene.isActive('telefono') && !this.telefono.anims.isPlaying) {
      this.entraLLamada = false;
    }
    if (!this.scene.isActive('movil') && !this.movil.anims.isPlaying) {
      this.entraMensaje = false;
      this.movil.setTexture('movilOff');
    }
  }
}
