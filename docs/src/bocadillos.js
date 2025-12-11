export default class Bocadillos extends Phaser.GameObjects.Container {
    constructor(scene, textoInicial, tipoEstafa, vidas, musica, lastMusic) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);

        this.musicaMenu = musica;
        this.lastMusic = lastMusic;
        this.textos = textoInicial;
        this.buttonEffect = this.scene.game.audioManager.fx("buttonClick");

        //Cuadro principal
        this.cuadro = this.scene.add.image(
            this.scene.cameras.main.width / 1.55,
            this.scene.cameras.main.height / 4.4,
            'cuadroTexto'
        ).setScale(0.6);

        const cuadroCenter = this.cuadro.getCenter();
        const maxWidth = this.cuadro.displayWidth * 0.9;
        const maxHeight = this.cuadro.displayHeight * 0.9;

        //autoescalado
        this.caso1 = this.crearTextoMaximoEnCuadro(
            cuadroCenter.x,
            cuadroCenter.y,
            this.textos.comienzo.mIni,
            maxWidth,
            maxHeight,
            { top: 40, right: 20, bottom: 30, left: 20 }
        );

        //fondos mociles segun tipo
        if (tipoEstafa === this.scene.textos.movil.SMS) {
            this.enlace = this.scene.add.text(this.caso1.x, this.caso1.y + this.caso1.height / 1.5,
                this.textos.comienzo.enlace,
                {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '20px',
                    color: '#0011ffff',
                    stroke: '#1e00ffff',
                    strokeThickness: 1,
                    align: 'center'
                }).setOrigin(0.5);

            const underline = this.scene.add.graphics();
            underline.lineStyle(2, 0x0011ff, 1);
            const bounds = this.enlace.getBounds();
            underline.strokeLineShape(new Phaser.Geom.Line(bounds.x, bounds.bottom + 2, bounds.right, bounds.bottom + 2));

            this.fondoMovil = this.scene.add.image(0, 0, 'fondoSMS');
            this.fondoMovil.setScale(this.scene.cameras.main.height / this.fondoMovil.height);
            this.fondoMovil.setDisplaySize(this.fondoMovil.width * this.scene.cameras.main.height / this.fondoMovil.height, this.scene.cameras.main.height);
            this.fondoMovil.setPosition(this.scene.cameras.main.width / 2.25, this.scene.cameras.main.height / 2);
        }
        else if (tipoEstafa === this.scene.textos.movil.whatsapp) {
            this.fondoMovil = this.scene.add.image(0, 0, 'was');
            this.fondoMovil.setScale(this.scene.cameras.main.height / this.fondoMovil.height);
            this.fondoMovil.setDisplaySize(this.fondoMovil.width * this.scene.cameras.main.height / this.fondoMovil.height, this.scene.cameras.main.height);
            this.fondoMovil.setPosition(this.scene.cameras.main.width / 2.25, this.scene.cameras.main.height / 2);
        }
        else if (tipoEstafa === this.scene.textos.movil.correo) {
            this.fondoMovil = this.scene.add.image(0, 0, 'fondoCorreo');
            this.fondoMovil.setScale(this.scene.cameras.main.height / this.fondoMovil.height);
            this.fondoMovil.setDisplaySize(this.fondoMovil.width * this.scene.cameras.main.height / this.fondoMovil.height, this.scene.cameras.main.height);
            this.fondoMovil.setPosition(this.scene.cameras.main.width / 2.25, this.scene.cameras.main.height / 2);
        }

        this.padding = this.scene.cameras.main.width / 9.5;
        this.topY = this.cuadro.y + this.padding * 1.8;
        this.gestV = vidas;
    }

    
    crearTextoMaximoEnCuadro(x, y, textoStr, maxWidth, maxHeight, padding) {

        const usableWidth = maxWidth - padding.left - padding.right;
        const usableHeight = maxHeight - padding.top - padding.bottom;

        let fontSize = 40;

        let txt = this.scene.add.text(x, y, textoStr, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: `${fontSize}px`,
            color: '#000000ff',
            stroke: '#000000',
            strokeThickness: 1,
            align: 'center',
            wordWrap: { width: usableWidth, useAdvancedWrap: true }
        }).setOrigin(0.5);

        while ((txt.width > usableWidth || txt.height > usableHeight) && fontSize > 8) {
            fontSize -= 1;
            txt.setFontSize(fontSize);
            txt.setWordWrapWidth(usableWidth);
        }

        // Reposición vertical respetando padding superior/inferior
        txt.y = y - (padding.top - padding.bottom) / 2;

        return txt;
    }

    ponerBocadillos(opcionesArray) {
        this.bocadillo1?.destroy();
        this.bocadillo2?.destroy();
        this.bocadillo3?.destroy();
        this.bocadillo4?.destroy();
        if (!opcionesArray || opcionesArray.length == 0) return;

        const keys = Object.keys(opcionesArray);

        switch (keys.length) {
            case 2:
                this.bocadillo1 = this.scene.add.image(this.caso1.x, this.topY - this.padding * 0.002, "bocadilloG").setOrigin(0.5).setScale(0.6).setInteractive();
                this.bocadillo2 = this.scene.add.image(this.caso1.x, this.topY + this.bocadillo1.height / 1.9, "bocadilloG").setOrigin(0.5).setScale(0.6).setInteractive();
                break;

            case 3:
                this.bocadillo1 = this.scene.add.image(this.caso1.x - this.padding, this.topY, "bocadilloP").setOrigin(0.5).setScale(0.6).setInteractive();
                this.bocadillo2 = this.scene.add.image(this.caso1.x + this.padding, this.topY, "bocadilloP").setOrigin(0.5).setScale(0.6).setInteractive();
                this.bocadillo3 = this.scene.add.image(this.caso1.x, this.topY + this.bocadillo1.height / 1.7, "bocadilloG").setOrigin(0.5).setScale(0.6).setInteractive();
                break;

            case 4:
                this.bocadillo1 = this.scene.add.image(this.caso1.x - this.padding, this.topY, "bocadilloP").setOrigin(0.5).setScale(0.6).setInteractive();
                this.bocadillo2 = this.scene.add.image(this.caso1.x + this.padding, this.topY, "bocadilloP").setOrigin(0.5).setScale(0.6).setInteractive();
                this.bocadillo3 = this.scene.add.image(this.caso1.x - this.padding, this.topY + this.bocadillo1.height / 1.7, "bocadilloP").setOrigin(0.5).setScale(0.6).setInteractive();
                this.bocadillo4 = this.scene.add.image(this.caso1.x + this.padding, this.topY + this.bocadillo1.height / 1.7, "bocadilloP").setOrigin(0.5).setScale(0.6).setInteractive();
                break;
        }

        this.ponerBotones(opcionesArray);
    }

    ponerTextos(opcionesArray) {
        this.texto1?.destroy();
        this.texto2?.destroy();
        this.texto3?.destroy();
        this.texto4?.destroy();
        if (!opcionesArray || opcionesArray.length == 0) return;

        const keys = Object.keys(opcionesArray);

        // Tu función antigua (se mantiene)
        const crearTexto = (bocadillo, textoStr) => {
            const maxWidth = bocadillo.width * bocadillo.scaleX * 0.9;
            const maxHeight = bocadillo.height * bocadillo.scaleY * 0.9;

            let fontSize = 27;
            let txt = this.scene.add.text(bocadillo.x, bocadillo.y, textoStr, {
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: `${fontSize}px`,
                color: '#000000ff',
                stroke: '#000000',
                strokeThickness: 1,
                align: 'center',
                wordWrap: { width: maxWidth, useAdvancedWrap: true }
            }).setOrigin(0.5);

            while ((txt.width > maxWidth || txt.height > maxHeight) && fontSize > 8) {
                fontSize -= 1;
                txt.setFontSize(fontSize);
            }

            return txt;
        };

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
        }
    }

    ponerBotones(opcionesArray) {
        if (!opcionesArray || opcionesArray.length === 0) return;

        const actualizarCaso = (siguiente) => {
            if (siguiente === "acierto" || siguiente === "fallo") {
                if (siguiente == "fallo") this.gestV.quitarVida();
                if (siguiente == "acierto") this.gestV.addAciertos();

                this.scene.scene?.pause('juego');
                this.scene.scene?.pause('tutorial');
                this.lastMusic?.stop();
                this.scene.scene.launch('respuestaCasos', {
                    respuesta: siguiente,
                    textos: this.textos,
                    vidas: this.gestV,
                    musica: this.musicaMenu
                });
                this.scene.scene.stop();
                return;
            }

            this.caso1?.destroy();

            const maxWidth = this.cuadro.displayWidth * 0.9;
            const maxHeight = this.cuadro.displayHeight * 0.9;
            const cuadroCenter = this.cuadro.getCenter();

           
            this.caso1 = this.crearTextoMaximoEnCuadro(
                cuadroCenter.x,
                cuadroCenter.y,
                this.textos[siguiente].mIni,
                maxWidth,
                maxHeight,
                { top: 40, right: 20, bottom: 30, left: 20 }
            );

            this.ponerBocadillos(this.textos[siguiente].opciones);
            this.ponerTextos(this.textos[siguiente].opciones);
        };

        const bocadillos = [this.bocadillo1, this.bocadillo2, this.bocadillo3, this.bocadillo4];

        bocadillos.forEach((bocadillo, index) => {
            if (!bocadillo || !opcionesArray[index]) return;

            bocadillo.setInteractive().off('pointerdown').on('pointerdown', () => {
                this.buttonEffect.play();
                actualizarCaso(opcionesArray[index].siguiente);
            });
        });
    }
}
