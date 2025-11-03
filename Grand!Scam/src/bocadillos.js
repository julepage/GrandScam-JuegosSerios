export default class Bocadillos extends Phaser.GameObjects.Container {
    constructor(scene, x, y, textoInicial) {
        super(scene, x, y);
        this.scene = scene;
        scene.add.existing(this);

        this.textos = textoInicial;
        //primer timo
        this.caso1 = this.scene.add.text(this.scene.cameras.main.width / 2 * 1.3, this.scene.cameras.main.height / 5, this.textos.comienzo.mIni, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '20px',
            color: '#000000ff',
            stroke: '#000000',
            strokeThickness: 1,
            align: 'center'
        }).setOrigin(0.5, 0.5);

        this.enlace = this.scene.add.text(this.caso1.x, this.caso1.y + this.caso1.height / 1.5, this.textos.comienzo.enlace, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '20px',
            color: '#0011ffff',
            stroke: '#1e00ffff',
            strokeThickness: 1,
            align: 'center'
        }).setOrigin(0.5, 0.5);
        // Dibujar línea debajo del texto
        const underline = this.scene.add.graphics();
        underline.lineStyle(2, 0x0011ff, 1); // grosor, color, alpha
        const bounds = this.enlace.getBounds();
        underline.strokeLineShape(new Phaser.Geom.Line(bounds.x, bounds.bottom + 2, bounds.right, bounds.bottom + 2));
    }

    //dependiendo del numero de respuestas pone un bocadillo
    ponerBocadillos(opcionesArray) {
        //? para comprobar si es un objeto definido, si no lo es simplemente no hace la funcion y no falla.
        this.bocadillo1?.destroy();
        this.bocadillo2?.destroy();
        this.bocadillo3?.destroy();
        this.bocadillo4?.destroy();
        if (!opcionesArray || opcionesArray.length == 0) return; // seguridad
        const keys = Object.keys(opcionesArray); // ["1","2","3"]
        console.log(keys.length);
        const padding = this.scene.cameras.main.width / 9;//12.8

        switch (keys.length) {
            case 2: {
                // Dos bocadillos grandes
                this.bocadillo1 = this.scene.add.image(
                    this.caso1.x,
                    this.caso1.y + this.caso1.height + padding,
                    "bocadilloG"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();

                this.bocadillo2 = this.scene.add.image(
                    this.caso1.x,
                    this.bocadillo1.y + this.bocadillo1.height / 2,
                    "bocadilloG"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                break;
            }
            case 3: {
                // Tres opciones: 2 pequeños arriba, 1 grande abajo
                const smallOffset = 10;
                const topY = this.caso1.y + this.caso1.height + padding;

                // Bocadillo pequeño izquierda
                this.bocadillo1 = this.scene.add.image(
                    this.caso1.x - padding, // separar un poco a la izquierda
                    topY,
                    "bocadilloP"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();

                // Bocadillo pequeño derecha
                this.bocadillo2 = this.scene.add.image(
                    this.caso1.x + this.scene.cameras.main.width / 14.76, // separar un poco a la derecha
                    topY,
                    "bocadilloP"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();

                // Bocadillo grande abajo
                this.bocadillo3 = this.scene.add.image(
                    this.caso1.x,
                    topY + this.bocadillo1.height / 2,
                    "bocadilloG"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                break;
            }
            case 4: {
                // Cuatro pequeños en cuadrícula 2x2
                const topY4 = this.caso1.y + this.caso1.height + padding;
                const bottomY4 = topY4 + this.scene.cameras.main.width / 38.4 + padding; // 50 = altura aproximada del bocadilloP
                const offsetX = this.scene.cameras.main.width / 19.2; // separación horizontal
                // fila superior
                this.bocadillo1 = this.scene.add.image(this.caso1.x - offsetX, topY4, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                this.bocadillo2 = this.scene.add.image(this.caso1.x + offsetX, topY4, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5).setInteractive();

                // fila inferior
                this.bocadillo3 = this.scene.add.image(this.caso1.x - offsetX, bottomY4, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                this.bocadillo4 = this.scene.add.image(this.caso1.x + offsetX, bottomY4, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                break;
            }
            default:
                console.warn("Número de opciones no soportado:", keys.length);
        }
        //LLamada a los botones
        this.ponerBotones(opcionesArray);
    }

    ponerTextos(opcionesArray) {//q le entre opciones del json
        //? para comprobar si es un objeto definido, si no lo es simplemente no hace la funcion y no falla.
        this.texto1?.destroy();
        this.texto2?.destroy();
        this.texto3?.destroy();
        this.texto4?.destroy();
        if (!opcionesArray || opcionesArray.length == 0) return; // seguridad
        const keys = Object.keys(opcionesArray); // ["1","2","3"]
        const padding = this.scene.cameras.main.width / 9;//12.8

        switch (keys.length) {
            case 2: {
                // Dos bocadillos grandes
                this.texto1 = this.scene.add.text(
                    this.caso1.x,
                    this.caso1.y + this.caso1.height + padding,
                    opcionesArray[0].texto, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '15px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);

                this.texto2 = this.scene.add.text(
                    this.caso1.x,
                    this.bocadillo1.y + this.bocadillo1.height / 2,
                    opcionesArray[1].texto, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '15px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);
                break;
            }
            case 3: {
                // Tres opciones: 2 pequeños arriba, 1 grande abajo
                const smallOffset = 10;
                const topY = this.caso1.y + this.caso1.height + padding;

                // Bocadillo pequeño izquierda
                this.texto1 = this.scene.add.text(
                    this.caso1.x - padding, // separar un poco a la izquierda
                    topY,
                    opcionesArray[0].texto, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '15px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);

                // Bocadillo pequeño derecha
                this.texto2 = this.scene.add.text(
                    this.caso1.x + this.scene.cameras.main.width / 14.76, // separar un poco a la derecha
                    topY,
                    opcionesArray[1].texto, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '15px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);

                // Bocadillo grande abajo
                this.texto3 = this.scene.add.text(
                    this.caso1.x,
                    topY + this.bocadillo1.height / 2,
                    opcionesArray[2].texto, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '15px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);
                break;
            }
            case 4: {
                // Cuatro pequeños en cuadrícula 2x2
                const topY4 = this.caso1.y + this.caso1.height + padding;
                const bottomY4 = topY4 + this.scene.cameras.main.width / 38.4 + padding; // 50 = altura aproximada del bocadilloP
                const offsetX = this.scene.cameras.main.width / 19.2; // separación horizontal
                // fila superior
                this.texto1 = this.scene.add.text(this.caso1.x - offsetX, topY4, opcionesArray[0].texto, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '15px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);

                this.texto2 = this.scene.add.text(this.caso1.x + offsetX, topY4, opcionesArray[1].texto, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '15px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);

                // fila inferior
                this.texto3 = this.scene.add.text(this.caso1.x - offsetX, bottomY4, opcionesArray[2].texto, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '15px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);

                this.texto4 = this.scene.add.text(this.caso1.x + offsetX, bottomY4, opcionesArray[3].texto, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '15px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);
                break;
            }
            default:
                console.warn("Número de opciones no soportado:", keys.length);
        }
    }

    //BOTONES
    ponerBotones(opcionesArray) {
        //? para comprobar si es un objeto definido, si no lo es simplemente no hace la funcion y no falla.
        //BOTON1
        this.bocadillo1?.on('pointerdown', () => {
            if (opcionesArray[0].siguiente == "acierto" || opcionesArray[0].siguiente == "fallo") {
                this.scene.scene.stop();
            }
            else {
                this.caso1.destroy();
                this.caso1 = this.scene.add.text(this.scene.cameras.main.width / 2 * 1.3, this.scene.cameras.main.height / 5, this.textos[opcionesArray[0].siguiente].mIni, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '20px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);
                this.ponerBocadillos(this.textos[opcionesArray[0].siguiente].opciones);
                this.ponerTextos(this.textos[opcionesArray[0].siguiente].opciones);
            }
        });

        //BOTON2
        this.bocadillo2?.on('pointerdown', () => {
            if (opcionesArray[1].siguiente == "acierto" || opcionesArray[1].siguiente == "fallo") {
                this.scene.scene.stop();
            }
            else {
                this.caso1.destroy();
                this.caso1 = this.scene.add.text(this.scene.cameras.main.width / 2 * 1.3, this.scene.cameras.main.height / 5, this.textos[opcionesArray[1].siguiente].mIni, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '20px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);
                this.ponerBocadillos(this.textos[opcionesArray[1].siguiente].opciones);
                this.ponerTextos(this.textos[opcionesArray[1].siguiente].opciones);
            }
        });

        //BOTON3
        this.bocadillo3?.on('pointerdown', () => {
            if (opcionesArray[2].siguiente == "acierto" || opcionesArray[2].siguiente == "fallo") {
                this.scene.scene.stop();
            }
            else {
                this.caso1.destroy();
                this.caso1 = this.scene.add.text(this.scene.cameras.main.width / 2 * 1.3, this.scene.cameras.main.height / 5, this.textos[opcionesArray[2].siguiente].mIni, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '20px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);
                this.ponerBocadillos(this.textos[opcionesArray[2].siguiente].opciones);
                this.ponerTextos(this.textos[opcionesArray[2].siguiente].opciones);
            }
        });

        //BOTON4
        this.bocadillo4?.on('pointerdown', () => {
            if (opcionesArray[3].siguiente == "acierto" || opcionesArray[3].siguiente == "fallo") {
                this.scene.scene.stop();
            }
            else {
                this.caso1.destroy();
                this.caso1 = this.scene.add.text(this.scene.cameras.main.width / 2 * 1.3, this.scene.cameras.main.height / 5, this.textos[opcionesArray[3].siguiente].mIni, {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '20px',
                    color: '#000000ff',
                    stroke: '#000000',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5, 0.5);
                this.ponerBocadillos(this.textos[opcionesArray[3].siguiente].opciones);
                this.ponerTextos(this.textos[opcionesArray[3].siguiente].opciones);
            }
        });
    }
}