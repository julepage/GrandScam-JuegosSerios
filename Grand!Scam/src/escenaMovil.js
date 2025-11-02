export default class EscenaMovil extends Phaser.Scene {
  constructor() {
    super({ key: 'movil' });
  }


  create() {
    //CARGAR TEXTOS
    const textos = this.cache.json.get('es');
    //Fondo negro translucido
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.5).setOrigin(0);
    //fondo movil
    this.fondo = this.add.image(0, 0, 'fondoMovil');
    this.fondo.setScale(this.cameras.main.height / this.fondo.height);
    this.fondo.setDisplaySize(this.fondo.width * this.cameras.main.height / this.fondo.height, this.cameras.main.height);
    this.fondo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    //primer timo
    this.caso1 = this.add.text(this.cameras.main.width / 2 * 1.3, this.cameras.main.height / 5, textos.SMS.caso1.mIni, {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: '20px',
      color: '#000000ff',
      stroke: '#000000',
      strokeThickness: 1,
      align: 'center'
    }).setOrigin(0.5, 0.5);
    this.enlace = this.add.text(this.caso1.x, this.caso1.y + this.caso1.height / 1.5, textos.SMS.caso1.enlace, {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: '20px',
      color: '#0011ffff',
      stroke: '#1e00ffff',
      strokeThickness: 1,
      align: 'center'
    }).setOrigin(0.5, 0.5);

    // Dibujar línea debajo del texto
    const underline = this.add.graphics();
    underline.lineStyle(2, 0x0011ff, 1); // grosor, color, alpha
    const bounds = this.enlace.getBounds();
    underline.strokeLineShape(new Phaser.Geom.Line(bounds.x, bounds.bottom + 2, bounds.right, bounds.bottom + 2));

    //poner bocadillos
    this.ponerBocadillos(textos.SMS.caso1.opciones);
  }

  //dependiendo del numero de respuestas pone un bocadillo
  ponerBocadillos(opcionesArray) {
    if (!opcionesArray || opcionesArray.length == 0) return; // seguridad
    const opcionesObj = opcionesArray[0];
    const keys = Object.keys(opcionesObj); // ["1","2","3"]
    const padding = 150;

    switch (keys.length) {
      case 2: {
        // Dos bocadillos grandes
        this.bocadillo1 = this.add.image(
          this.caso1.x,
          this.caso1.y + this.caso1.height + padding,
          "bocadilloG"
        ).setOrigin(0.5, 0.5).setScale(0.5);

        this.bocadillo2 = this.add.image(
          this.caso1.x,
          this.bocadillo1.y + this.bocadillo1.height / 2,
          "bocadilloG"
        ).setOrigin(0.5, 0.5).setScale(0.5);
        break;
      }
      case 3: {
        // Tres opciones: 2 pequeños arriba, 1 grande abajo
        const smallOffset = 10;
        const topY = this.caso1.y + this.caso1.height + padding;

        // Bocadillo pequeño izquierda
        this.bocadillo1 = this.add.image(
          this.caso1.x - 150, // separar un poco a la izquierda
          topY,
          "bocadilloP"
        ).setOrigin(0.5, 0.5).setScale(0.5);

        // Bocadillo pequeño derecha
        this.bocadillo2 = this.add.image(
          this.caso1.x + 130, // separar un poco a la derecha
          topY,
          "bocadilloP"
        ).setOrigin(0.5, 0.5).setScale(0.5);

        // Bocadillo grande abajo
        this.bocadillo3 = this.add.image(
          this.caso1.x,
          topY + this.bocadillo1.height / 2,
          "bocadilloG"
        ).setOrigin(0.5, 0.5).setScale(0.5);
        break;
      }
      case 4: {
        // Cuatro pequeños en cuadrícula 2x2
        const topY4 = this.caso1.y + this.caso1.height + padding;
        const bottomY4 = topY4 + 50 + padding; // 50 = altura aproximada del bocadilloP
        const offsetX = 100; // separación horizontal
        // fila superior
        this.bocadillo1 = this.add.image(this.caso1.x - offsetX, topY4, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5);
        this.bocadillo2 = this.add.image(this.caso1.x + offsetX, topY4, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5);
        // fila inferior
        this.bocadillo3 = this.add.image(this.caso1.x - offsetX, bottomY4, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5);
        this.bocadillo4 = this.add.image(this.caso1.x + offsetX, bottomY4, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5);
        break;
      }
      default:
        console.warn("Número de opciones no soportado:", keys.length);
    }
  }

  update() {

  }
}