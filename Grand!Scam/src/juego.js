export default class Juego extends Phaser.Scene {
  constructor() {
    super({ key: 'juego' });
    this.entraLLamada = false;
    this.entraMensaje = false;
  }

  create() {
    //POSICION Y TAMAÑO DEL FONDO
    this.fondo = this.add.image(0, 0, 'fondoJuego');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    //CREACION ANIMACIONES DEL JUEGO
    this.createAnims();

    //ANIM HUMO (SIEMPRE VA A ESTAR EN ESCENA)
    this.humo = this.add.sprite(this.cameras.main.width / 3.43, this.cameras.main.height / 1.54, 'animHumo');
    this.humo.anims.play('humo');

    //INSTANCIA DEL TELEFONO (ESTA FIJO PERO SIN ANIM)
    this.telefono = this.add.sprite(this.cameras.main.width / 1.335, 
      this.cameras.main.height / 1.54, 'animTelefono').setInteractive();
    
      //PULSACION DEL BOTON TELEFONO
    this.telefono.on('pointerdown', () => {
      if(this.entraLLamada){
        this.telefonoScene();
      }
    });

  }

  telefonoScene(){
    this.telefono.stop();
    this.telefono.setFrame(0);
    this.scene.launch('telefono');
  }

  createAnims(){
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
  }

  update() {
    if(!this.entraLLamada && !this.entraMensaje)
    {
      const num = Phaser.Math.Between(0, 100);
      if (num == 1) {
        this.entraLLamada = true;
        this.telefono.anims.play('telefono');
      }

      if(num == 2){
        this.entraMensaje = true;
        //ANIMACION
      }
   }

    // if(!this.scene.isActive('telefono')){
    //   this.entraLLamada = false;
    // }
}
}
