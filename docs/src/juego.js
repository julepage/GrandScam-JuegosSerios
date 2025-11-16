import GestionVida from "./gestionVida.js";

export default class Juego extends Phaser.Scene {
  constructor() {
    super({ key: 'juego' });
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
    this.entraLLamada = false;
    this.entraMensaje = false;
    this.masLLamada = true;
    this.masMensaje = true;
    this.obLlamada = true;
    this.obMovil = true;
    this.musicaMenu = this.game.audioManager.musica("musicaPrincipal");
    this.musicaMenu.play();
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

    //VENTANA
    this.scrollSpeed = 0.4; // velocidad del movimiento (ajústala)
    this.ventana1 = this.add.image(0, 0, 'ventana1').setOrigin(0, 0);
    this.ventana2 = this.add.image(this.ventana1.width, 0, 'ventana2').setOrigin(0, 0);
    this.ventana3 = this.add.image(this.ventana1.width * 2, 0, 'ventana3').setOrigin(0, 0);

    //POSICION Y TAMAÑO DEL FONDO
    this.fondo = this.add.image(0, 0, 'fondoJuego');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    // Detectar la tecla ESC
    this.teclaEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    //ANIM HUMO (SIEMPRE VA A ESTAR EN ESCENA)
    this.humo = this.add.sprite(this.cameras.main.width / 4.45, this.cameras.main.height / 1.52, 'animHumo');
    this.humo.anims.play('humo');

    this.vidas = new GestionVida(this);
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
    this.textos = this.cache.json.get('es');
    this.casosDisponiblesLLOb = Object.keys(this.textos.telefono.llamada.obligatorio);
    this.casosDisponiblesLLOp = Object.keys(this.textos.telefono.llamada.opcional);
    this.casosDisponiblesSMSOb = Object.keys(this.textos.movil.SMS.obligatorio);
    this.casosDisponiblesSMSOp = Object.keys(this.textos.movil.SMS.opcional);
    this.casosDisponiblesWAOb = Object.keys(this.textos.movil.whatsapp.obligatorio);
    this.casosDisponiblesWAOp = Object.keys(this.textos.movil.whatsapp.opcional);
    this.casosDisponiblesCOOb = Object.keys(this.textos.movil.correo.obligatorio);
    this.casosDisponiblesCOOp = Object.keys(this.textos.movil.correo.opcional);
    this.casosApp = Object.keys(this.textos.movil);
  }

  //CAMBIOS ESCENAS
  telefonoScene() {
    this.telefono.stop();
    this.telefono.setFrame(0);
    if (this.casosDisponiblesLLOb.length > 0) {
      const index = Phaser.Math.RND.between(0, this.casosDisponiblesLLOb.length - 1);
      this.randomCaso = this.casosDisponiblesLLOb[index];

      this.casosDisponiblesLLOb.length = 0;
    }
    else if (this.casosDisponiblesLLOp.length > 0) {
      this.obLlamada = false;
      const index = Phaser.Math.RND.between(0, this.casosDisponiblesLLOp.length - 1);
      this.randomCaso = this.casosDisponiblesLLOp[index];
      this.casosDisponiblesLLOp.splice(index, 1);
      if (this.casosDisponiblesLLOp.length == 0)
        this.masLLamada = false;
    }
    else {
      this.randomCaso = " ";
    }
    this.scene.launch('telefono', { vidas: this.vidas, textos: this.textos, randomCaso: this.randomCaso, obligatorio: this.obLlamada });
  }
  movilScene() {
    this.movil.stop();
    this.movil.setFrame(0);

    const i = Phaser.Math.RND.between(0, this.casosApp.length - 1);
    this.randomApp = this.casosApp[i];

    this.casosDisponiblesOb = this.casosDisponiblesSMSOb;
    this.casosDisponiblesOp = this.casosDisponiblesSMSOp;

    if (this.randomApp == "SMS")
      if (this.casosDisponiblesSMSOb.length > 0)
        this.casosDisponiblesOb = this.casosDisponiblesSMSOb;
      else {
        this.casosDisponiblesOp = this.casosDisponiblesSMSOp;
      }
    else if (this.randomApp == "whatsapp")
      if (this.casosDisponiblesWAOb.length > 0)
        this.casosDisponiblesOb = this.casosDisponiblesWAOb;
      else {
        this.casosDisponiblesOp = this.casosDisponiblesWAOp;
      }
    else if (this.randomApp == "correo")
      if (this.casosDisponiblesCOOb.length > 0)
        this.casosDisponiblesOb = this.casosDisponiblesCOOb;
      else {
        this.casosDisponiblesOp = this.casosDisponiblesCOOp;
      }
    console.log(this.casosApp)
    if (this.casosDisponiblesOb.length > 0) {
      this.obMovil = true;
      const index = Phaser.Math.RND.between(0, this.casosDisponiblesOb.length - 1);
      this.randomCaso = this.casosDisponiblesOb[index];

      this.casosDisponiblesOb.length = 0;
    }
    else if (this.casosDisponiblesOp.length > 0) {
      this.obMovil = false;
      const index = Phaser.Math.RND.between(0, this.casosDisponiblesOp.length - 1);
      this.randomCaso = this.casosDisponiblesOp[index];

      console.log(this.casosDisponiblesOp);

      this.casosDisponiblesOp.splice(index, 1);
      if (this.casosDisponiblesOp.length == 0)
        this.casosApp.splice(i, 1);
      if (this.casosApp.length == 0)
        this.masMensaje = false;
    }
    else {
      this.randomCaso = " ";
    }
    // console.log(this.randomApp);
    // console.log(this.randomCaso);
    this.scene.launch('movil', { vidas: this.vidas, textos: this.textos, randomApp: this.randomApp, randomCaso: this.randomCaso, obligatorio: this.obMovil });
  }
  escenaPausa() {
    this.scene.launch('EscenaPausa');
    this.scene.pause();
  }

  update() {
    // MOVIMIENTO CONTINUO DEL CIELO (se laggeeeeea)
    this.ventana1.x -= this.scrollSpeed;
    this.ventana2.x -= this.scrollSpeed;
    this.ventana3.x -= this.scrollSpeed;
    // Reposicionar si alguna sale completamente a la izquierda
    if (this.ventana1.x + this.ventana1.width <= 0) {
      this.ventana1.x = Math.max(this.ventana2.x, this.ventana3.x) + this.ventana1.width;
    }
    if (this.ventana2.x + this.ventana2.width <= 0) {
      this.ventana2.x = Math.max(this.ventana1.x, this.ventana3.x) + this.ventana2.width;
    }
    if (this.ventana3.x + this.ventana3.width <= 0) {
      this.ventana3.x = Math.max(this.ventana1.x, this.ventana2.x) + this.ventana3.width;
    }

    //FLUJO JUEGO
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
