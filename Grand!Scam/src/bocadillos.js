export default class Bocadillos extends Phaser.GameObjects.Container {
    constructor(scene, textoInicial, tipoEstafa, vidas) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);

        this.textos = textoInicial;
        // Crear el cuadro
        this.cuadro = this.scene.add.image(
            this.scene.cameras.main.width / 1.5,
            this.scene.cameras.main.height / 4.4,
            'cuadroTexto'
        ).setScale(0.5);

        // Obtener posición central real del cuadro
        const cuadroCenter = this.cuadro.getCenter();

        // Obtener dimensiones reales escaladas
        const maxWidth = this.cuadro.displayWidth * 0.9;
        const maxHeight = this.cuadro.displayHeight * 0.9;

        // Función para texto escalable
        const crearTextoEscalable = (x, y, textoStr, maxWidth, maxHeight) => {
            let fontSize = 20;
            let txt = this.scene.add.text(x, y, textoStr, {
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: `${fontSize}px`,
                color: '#000000ff',
                stroke: '#000000',
                strokeThickness: 1,
                align: 'center',
                wordWrap: { width: maxWidth, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);

            // Reducir fuente hasta que ancho y alto encajen
            while ((txt.width > maxWidth || txt.height > maxHeight) && fontSize > 8) {
                fontSize -= 1;
                txt.setFontSize(fontSize);
                txt.setWordWrapWidth(maxWidth); // 🔹 recalcula wordWrap con la nueva fuente
            }

            return txt;
        }

        // Crear texto centrado en el cuadro
        this.caso1 = crearTextoEscalable(
            cuadroCenter.x,
            cuadroCenter.y,
            this.textos.comienzo.mIni,
            maxWidth,
            maxHeight
        );


        if (tipoEstafa === this.scene.textos.movil.SMS.obligatorio) {
            this.enlace = this.scene.add.text(this.caso1.x, this.caso1.y + this.caso1.height / 1.5, this.textos.comienzo.enlace, {
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '20px',
                color: '#0011ffff',
                stroke: '#1e00ffff',
                strokeThickness: 1,
                align: 'center'
            }).setOrigin(0.5, 0.5);
            //dibuja linea debajo del texto
            const underline = this.scene.add.graphics();
            underline.lineStyle(2, 0x0011ff, 1); //grosor, color, alpha
            const bounds = this.enlace.getBounds();
            underline.strokeLineShape(new Phaser.Geom.Line(bounds.x, bounds.bottom + 2, bounds.right, bounds.bottom + 2));
            this.fondoMovil = this.scene.add.image(0, 0, 'fondoSMS');
            this.fondoMovil.setScale(this.scene.cameras.main.height / this.fondoMovil.height);
            this.fondoMovil.setDisplaySize(this.fondoMovil.width * this.scene.cameras.main.height / this.fondoMovil.height, this.scene.cameras.main.height);
            this.fondoMovil.setPosition(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2);
        }
        this.padding = this.scene.cameras.main.width / 11.5;//12.8
        this.topY = this.cuadro.y + this.padding * 2;
        this.gestV = vidas;
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

        switch (keys.length) {
            case 2: {
                // Dos bocadillos grandes
                this.bocadillo1 = this.scene.add.image(
                    this.caso1.x,
                    this.topY - this.padding * 0.002,
                    "bocadilloG"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();

                this.bocadillo2 = this.scene.add.image(
                    this.caso1.x,
                    this.topY + this.bocadillo1.height / 2.355,
                    "bocadilloG"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                break;
            }
            case 3: {
                // Tres opciones: 2 pequeños arriba, 1 grande abajo

                // Bocadillo pequeño izquierda
                this.bocadillo1 = this.scene.add.image(
                    this.caso1.x - this.padding, // separar un poco a la izquierda
                    this.topY,
                    "bocadilloP"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();

                // Bocadillo pequeño derecha
                this.bocadillo2 = this.scene.add.image(
                    this.caso1.x + this.padding, // separar un poco a la derecha
                    this.topY,
                    "bocadilloP"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();

                // Bocadillo grande abajo
                this.bocadillo3 = this.scene.add.image(
                    this.caso1.x,
                    this.topY + this.bocadillo1.height / 2,
                    "bocadilloG"
                ).setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                break;
            }
            case 4: {
                // fila superior
                this.bocadillo1 = this.scene.add.image(this.caso1.x - this.padding, this.topY, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                this.bocadillo2 = this.scene.add.image(this.caso1.x + this.padding, this.topY, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5).setInteractive();

                // fila inferior
                this.bocadillo3 = this.scene.add.image(this.caso1.x - this.padding, this.topY + this.bocadillo1.height / 1.95, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                this.bocadillo4 = this.scene.add.image(this.caso1.x + this.padding, this.topY + this.bocadillo1.height / 1.95, "bocadilloP").setOrigin(0.5, 0.5).setScale(0.5).setInteractive();
                break;
            }
            default:
                console.warn("Número de opciones no soportado:", keys.length);
        }
        //llamada a los botones
        this.ponerBotones(opcionesArray);
    }

    ponerTextos(opcionesArray) {
        //borra los textos anteriores
        this.texto1?.destroy();
        this.texto2?.destroy();
        this.texto3?.destroy();
        this.texto4?.destroy();
        if (!opcionesArray || opcionesArray.length == 0) return;

        const keys = Object.keys(opcionesArray);
        const padding = this.scene.cameras.main.width / 9;

        //funcion para crear texto escalado dentro del bocadillo
        const crearTexto = (bocadillo, textoStr) => {
            //ancho y alto max
            const maxWidth = bocadillo.width * bocadillo.scaleX * 0.9;
            const maxHeight = bocadillo.height * bocadillo.scaleY * 0.9;

            let fontSize = 18; //tam ini
            let txt = this.scene.add.text(bocadillo.x, bocadillo.y, textoStr, {
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: `${fontSize}px`,
                color: '#000000ff',
                stroke: '#000000',
                strokeThickness: 1,
                align: 'center',
                wordWrap: { width: maxWidth, useAdvancedWrap: true }
            }).setOrigin(0.5, 0.5);

            //hacer que encajen 
            while ((txt.width > maxWidth || txt.height > maxHeight) && fontSize > 8) {
                fontSize -= 1;
                txt.setFontSize(fontSize);
            }

            return txt;
        }

        switch (keys.length) {
            case 2:
                this.texto1 = crearTexto(this.bocadillo1, opcionesArray[0].texto);
                this.texto2 = crearTexto(this.bocadillo2, opcionesArray[1].texto);
                break;

            case 3:
                this.texto1 = crearTexto(this.bocadillo1, opcionesArray[0].texto);
                this.texto2 = crearTexto(this.bocadillo2, opcionesArray[1].texto);
                this.texto3 = crearTexto(this.bocadillo3, opcionesArray[2].texto);
                break;

            case 4:
                this.texto1 = crearTexto(this.bocadillo1, opcionesArray[0].texto);
                this.texto2 = crearTexto(this.bocadillo2, opcionesArray[1].texto);
                this.texto3 = crearTexto(this.bocadillo3, opcionesArray[2].texto);
                this.texto4 = crearTexto(this.bocadillo4, opcionesArray[3].texto);
                break;

            default:
                console.warn("Número de opciones no soportado:", keys.length);
        }
    }


    //BOTONES
    ponerBotones(opcionesArray) {
        if (!opcionesArray || opcionesArray.length === 0) return;

        // Función para actualizar el texto del cuadro y los bocadillos
        const actualizarCaso = (siguiente) => {
            if (siguiente === "acierto" || siguiente === "fallo") {
                if (siguiente == "fallo")
                    this.gestV.quitarVida();
                if(siguiente == "acierto")
                    this.gestV.addAciertos();
                this.scene.scene.stop();
                return;
            }

            this.caso1?.destroy();

            // Calcular dimensiones del cuadro
            const maxWidth = this.cuadro.displayWidth * 0.9;
            const maxHeight = this.cuadro.displayHeight * 0.9;
            const cuadroCenter = this.cuadro.getCenter();

            // Crear texto escalable
            this.caso1 = this.crearTextoEscalable(cuadroCenter.x, cuadroCenter.y, this.textos[siguiente].mIni, maxWidth, maxHeight);

            // Actualizar bocadillos y textos
            this.ponerBocadillos(this.textos[siguiente].opciones);
            this.ponerTextos(this.textos[siguiente].opciones);
        };

        // Lista de bocadillos
        const bocadillos = [this.bocadillo1, this.bocadillo2, this.bocadillo3, this.bocadillo4];

        bocadillos.forEach((bocadillo, index) => {
            if (!bocadillo || !opcionesArray[index]) return;

            bocadillo.setInteractive().off('pointerdown').on('pointerdown', () => {
                actualizarCaso(opcionesArray[index].siguiente);
            });
        });
    }

    // Función reusable para crear texto escalable
    crearTextoEscalable(x, y, textoStr, maxWidth, maxHeight) {
        let fontSize = 20;
        let txt = this.scene.add.text(x, y, textoStr, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: `${fontSize}px`,
            color: '#000000ff',
            stroke: '#000000',
            strokeThickness: 1,
            align: 'center',
            wordWrap: { width: maxWidth, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);

        // Ajustar fuente hasta que encaje en ancho y alto
        while ((txt.width > maxWidth || txt.height > maxHeight) && fontSize > 8) {
            fontSize -= 1;
            txt.setFontSize(fontSize);
            txt.setWordWrapWidth(maxWidth);
        }

        return txt;
    }

}