import GestionVida from "./gestionVida.js";

export default class Juego extends Phaser.Scene {
  constructor() {
    super({ key: 'juego' });
    this.entraLLamada = false;
    this.entraMensaje = false;
    this.masLLamada = true;
    this.masMensaje = true;
  }

  //DATOS DEL FORMULARIO
  init(data) {
    this.playerData = data.playerData;
  }

  reemplazarEnJson(obj, data) {
    if (typeof obj === 'string') {
      return obj.replace(/\{(\w+)\}/g, (_, key) => data[key] ?? `{${key}}`);
    } else if (Array.isArray(obj)) {
      return obj.map(v => this.reemplazarEnJson(v, data));
    } else if (typeof obj === 'object' && obj !== null) {
      const nuevo = {};
      for (const k in obj) nuevo[k] = this.reemplazarEnJson(obj[k], data);
      return nuevo;
    }
    return obj;
  }

  create() {
    // Dentro del create() de la nueva escena
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    // Personalizar textos solo la primera vez
    if (!this.registry.get('textosPersonalizados')) {
      const textosBase = this.cache.json.get('es');  // Tu JSON de diálogos
      const textosPersonalizados = this.reemplazarEnJson(textosBase, this.playerData);

      // ⚠️ Importante: Phaser devuelve una referencia viva, así que esto modifica el JSON global
      Object.assign(textosBase, textosPersonalizados);

      // Marca que ya se hizo el reemplazo
      this.registry.set('textosPersonalizados', true);
      // Marcar el cuestionario como completado
      this.registry.set('cuestionarioCompletado', true);

    }


    //POSICION Y TAMAÑO DEL FONDO
    this.fondo = this.add.image(0, 0, 'fondoJuego');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    // Detectar la tecla ESC
    this.teclaEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    //CREACION ANIMACIONES DEL JUEGO
    this.createAnims();

    //ANIM HUMO (SIEMPRE VA A ESTAR EN ESCENA)
    this.humo = this.add.sprite(this.cameras.main.width / 4.45, this.cameras.main.height / 1.52, 'animHumo');
    this.humo.anims.play('humo');

    //INSTANCIA DEL TELEFONO (ESTA FIJO PERO SIN ANIM)
    this.telefono = this.add.sprite(this.cameras.main.width / 1.25,
      this.cameras.main.height / 1.45, 'animTelefono').setInteractive();

    //PULSACION DEL BOTON TELEFONO
    this.telefono.on('pointerdown', () => {
      if (this.entraLLamada) {
        this.telefonoScene();
      }
    });

    //INSTANCIA DEL MOVIL (ESTA FIJO PERO SIN ANIM)
    this.movil = this.add.sprite(this.cameras.main.width / 2.94,
      this.cameras.main.height / 1.825, 'movilOff').setInteractive();

    //PULSACION DEL BOTON MOVIL
    this.movil.on('pointerdown', () => {
      if (this.entraMensaje) {
        this.movilScene();
      }
    });

    //BOTON PAUSA
    this.botonPausa = this.add.sprite(this.cameras.main.width / 20, 60, "botonPausa").setInteractive().setScale(0.4).setDepth(1);
    this.botonPausa.on('pointerdown', () => {
      this.escenaPausa();
    });

    this.botonPausa.on('pointerover', () => { this.botonPausa.setScale(0.45); });
    this.botonPausa.on('pointerout', () => { this.botonPausa.setScale(0.4); });
    this.vidas = new GestionVida(this);
    this.textos = this.cache.json.get('es');
    this.casosDisponiblesLLOb = Object.keys(this.textos.telefono.llamada.obligatorio);
    this.casosDisponiblesLLOp = Object.keys(this.textos.telefono.llamada.opcional);
    this.casosDisponiblesSMSOb = Object.keys(this.textos.movil.SMS.obligatorio);
    this.casosDisponiblesSMSOp = Object.keys(this.textos.movil.SMS.obligatorio);
    this.casosDisponiblesWAOb = Object.keys(this.textos.movil.whatsapp.opcional);
    this.casosDisponiblesWAOp = Object.keys(this.textos.movil.whatsapp.opcional);
    //this.casosDisponiblesGM = Object.keys(this.textos.movil.gmail);
  }

  //CAMBIOS ESCENAS
  telefonoScene() {
    this.telefono.stop();
    this.telefono.setFrame(0);
    if (this.casosDisponiblesLLOb.length > 0) {
      this.masLLamada = true;
      const index = Phaser.Math.RND.between(0, this.casosDisponiblesLLOb.length - 1);
      this.randomCaso = this.casosDisponiblesLLOb[index];

      this.casosDisponiblesLLOb.splice(index, 1);
      this.masLLamada = false;
    }
    // else if (this.casosDisponiblesLLOp.length > 0) {
    //   this.masLLamada = true;
    //   const index = Phaser.Math.RND.between(0, this.casosDisponiblesLLOp.length - 1);
    //   this.randomCaso = this.casosDisponiblesLLOp[index];

    //   this.casosDisponiblesLLOp.splice(index, 1);
    //   this.masLLamada = false;
    // }
    else {
      this.randomCaso = " ";
    }
    this.scene.launch('telefono', { vidas: this.vidas, textos: this.textos, randomCaso: this.randomCaso });
  }
  movilScene() {
    this.movil.stop();
    this.movil.setFrame(0);
    this.casosApp = Object.keys(this.textos.movil);
    const index = Phaser.Math.RND.between(0, this.casosApp.length - 1);
    this.randomApp = this.casosApp[index];
    this.casosDisponiblesOb = this.casosDisponiblesSMSOb;
    this.casosDisponiblesOp = this.casosDisponiblesSMSOp;
    if (this.randomApp == this.textos.movil.SMS)
      if (this.casosDisponiblesSMSOb.length > 0)
        this.casosDisponiblesOb = this.casosDisponiblesSMSOb;
      // else
      //   this.casosDisponiblesOp = this.casosDisponiblesSMSOp;
    else if (this.randomApp == this.textos.movil.whatsapp)
      if (this.casosDisponiblesWAOb.length > 0)
        this.casosDisponiblesOb = this.casosDisponiblesWAOb;
      // else
      //   this.casosDisponiblesOp = this.casosDisponiblesWAOp;
    // else if (this.reandomApp == this.textos.movil.correo)
    //   if (this.casosDisponiblesSMSOb)
    //   this.casosDisponiblesOb = this.casosDisponiblesSMSOb;
    // else
    //   this.casosDisponiblesOp = this.casosDisponiblesSMSOp;
    if (this.casosDisponiblesOb.length > 0) {
      this.masMensaje = true;
      const index = Phaser.Math.RND.between(0, this.casosDisponiblesOb.length - 1);
      this.randomCaso = this.casosDisponiblesOb[index];

      if (this.reandomApp == this.textos.movil.SMS)
        this.casosDisponiblesSMSOb.splice(index, 1);
      else if (this.reandomApp == this.textos.movil.whatsapp)
        this.casosDisponiblesWAOb.splice(index, 1);
      // else if (this.reandomApp == this.textos.movil.gmail)
      //   this.casosDisponiblesSMSOb.splice(index, 1);

      this.casosDisponiblesOb.splice(index, 1);
      this.masMensaje = false;
    }
    // else if (this.casosDisponiblesOp.length > 0) {
    //   this.masMensaje = true;
    //   const index = Phaser.Math.RND.between(0, this.casosDisponiblesOp.length - 1);
    //   this.randomCaso = this.casosDisponiblesOp[index];

    //   if (this.reandomApp == this.textos.movil.SMS)
    //     this.casosDisponiblesSMSOp.splice(index, 1);
    //   else if (this.reandomApp == this.textos.movil.whatsapp)
    //     this.casosDisponiblesWAOp.splice(index, 1);
    //   // else if (this.reandomApp == this.textos.movil.gmail)
    //   //   this.casosDisponiblesSMSOp.splice(index, 1);

    //   this.casosDisponiblesOp.splice(index, 1);
    //   this.masMensaje = false;
    // }
    else {
      this.randomCaso = " ";
    }
    this.scene.launch('movil', { vidas: this.vidas, textos: this.textos, randomApp: this.randomApp, randomCaso: this.randomCaso });
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
      if (num == 0 && this.masLLamada) {
        this.entraLLamada = true;
        this.telefono.anims.play('telefono');
      }

      if (num == 1 && this.masMensaje) {
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
