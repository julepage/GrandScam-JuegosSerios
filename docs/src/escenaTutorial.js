import GestionVida from "./gestionVida.js";

export default class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: "tutorial" });
    }

    create() {
        this.entraLLamada = false;
        this.entraMensaje = false;
        this.masLLamada = true;
        this.masMensaje = true;
        this.obLlamada = true;
        this.obMovil = true;
        this.puedePasar = true;

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        //CIELO VENTANA
        this.scrollSpeed = 0.4;
        this.ventana1 = this.add.image(0, 0, "ventana1").setOrigin(0, 0);
        this.ventana2 = this.add.image(this.ventana1.width, 0, "ventana2").setOrigin(0, 0);
        this.ventana3 = this.add.image(this.ventana1.width * 2, 0, "ventana3").setOrigin(0, 0);

        //FONDO
        this.fondo = this.add.image(0, 0, "fondoJuego");
        this.fondo.setScale(this.cameras.main.height / this.fondo.height);
        this.fondo.setPosition(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2
        );

        this.vidas = new GestionVida(this);

        //HUMO
        this.humo = this.add.sprite(
            this.cameras.main.width / 4.45,
            this.cameras.main.height / 1.52,
            "animHumo"
        );
        this.humo.anims.play("humo");

        this.instruccionTexto = null;
        this.capa = null;

        //TELEF Y MOVIL
        this.telefonoTutorial = this.add
            .sprite(
                this.cameras.main.width / 1.25,
                this.cameras.main.height / 1.45,
                "animTelefono"
            )
            .setInteractive();

        this.telefonoTutorial.on("pointerdown", () => {
            if (this.entraLLamada) this.avanzarPaso();
        });

        this.movil = this.add
            .sprite(
                this.cameras.main.width / 2.94,
                this.cameras.main.height / 1.825,
                "movilOff"
            )
            .setInteractive();

        this.movil.on("pointerdown", () => {
            if (this.entraMensaje) this.avanzarPaso();
        });

        this.textos = this.cache.json.get("es");

        //INTRO
        this.mensaje1 = this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 4,
                this.textos.tutorial.bocadillos.titulo,
                {
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: "200px",
                    color: "#ff5100ff",
                    stroke: "#561b00ff",
                    strokeThickness: 10,
                    backgroundColor: "#000000",
                    align: "center"
                }
            )
            .setScale(0.4)
            .setDepth(1)
            .setOrigin(0.5);

        //ENTER
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.enter.on("down", () => {
            if (
                !this.scene.isActive("tutorialMovil") &&
                !this.scene.isActive("tutorialTelefono") &&
                this.paso !== "llamada" &&
                this.paso !== "mensaje"
            ) {
                this.avanzarPaso();
            }
        });
        //EMPIEZO EN INTRO
        this.paso = "intro";
    }

   
    //INTRO → RESUMEN → VIDAS → PAUSA → CASOS
    avanzarPaso() {
        if (!this.puedePasar) return;

        //INTRO→RESUMEN
        if (this.paso === "intro") {
            this.mensaje1.destroy();
            this.mostrarResumen();
            this.paso = "resumen";
            return;
        }

        //RESUMEN→VIDAS
        if (this.paso === "resumen") {
            this.textoResumen.destroy();
            this.capaResumen.destroy();
            this.paso = "vidas";
            this.mostrarVidasPaso();
            return;
        }

        //VIDAS→PAUSA
        if (this.paso === "vidas") {
            this.instruccionTexto1.destroy();
            this.flecha.destroy();
            this.mostrarPasoPausa();
            this.paso = "pausa";
            return;
        }

        //PAUSA→ESPERANDO CASOS
        if (this.paso === "pausa") {
            this.textoPausa.destroy();
            this.botonPausa.destroy();
            this.capa1.destroy();
            this.flecha.destroy();
            this.paso = "esperando_evento";
            return;
        }

        //LLAMADA
        if (this.paso === "llamada") {
            this.instruccionTexto.destroy();
            this.capa.destroy();
            this.telefonoScene();
            this.paso = "esperando_evento";

            //Si ya se han hecho ambos casos, terminar tutorial
            if (!this.masLLamada && !this.masMensaje) {
                this.scene.start("menu");
            }

            return;
        }

        //MENSAJE
        if (this.paso === "mensaje") {
            this.instruccionTexto.destroy();
            this.capa.destroy();
            this.movilScene();
            this.paso = "esperando_evento";

            //Si ya se hicieron ambos casos, terminar tutorial
            if (!this.masLLamada && !this.masMensaje) {
                this.scene.start("menu");
            }

            return;
        }

    }

    telefonoScene() {
        this.telefonoTutorial.stop();
        this.telefonoTutorial.setFrame(0);
        this.masLLamada = false;
        this.scene.launch("tutorialTelefono", {
            vidas: this.vidas,
            textos: this.textos
        });
    }

    movilScene() {
        this.movil.stop();
        this.movil.setFrame(0);
        this.masMensaje = false;
        this.scene.launch("tutorialMovil", {
            vidas: this.vidas,
            textos: this.textos
        });
    }

    //VIDA
    mostrarVidasPaso() {
        this.capa1 = this.add
            .image(0, 0, "tutorialV")
            .setScale(this.cameras.main.height / this.fondo.height)
            .setPosition(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2
            );

        this.flecha = this.add
            .image(0, 0, "flecha")
            .setScale(this.cameras.main.height / this.fondo.height)
            .setPosition(
                this.cameras.main.width / 2,
                this.cameras.main.height / 3
            );

        this.instruccionTexto1 = this.add
            .text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 200,
                this.textos.tutorial.bocadillos.vidas,
                {
                    fontSize: "48px",
                    fill: "#ffffff",
                    backgroundColor: "#000000"
                }
            )
            .setOrigin(0.5);
    }

    //PAUSA
    mostrarPasoPausa() {
       
        this.flecha = this.add
            .image(0, 0, "flechaA")
            .setScale(this.cameras.main.height / this.fondo.height)
            .setPosition(
                this.cameras.main.width / 2,
                this.cameras.main.height / 3
            );

        this.botonPausa = this.add
            .sprite(this.cameras.main.width / 20, 60, "botonPausa")
            .setInteractive()
            .setScale(0.4)
            .setDepth(1);

        this.textoPausa = this.add
            .text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 200,
                this.textos.tutorial.bocadillos.pausa,
                { fontSize: "48px", fill: "#ffffff", backgroundColor: "#000000" }
            )
            .setOrigin(0.5);
    }

    //RESUMEN
    mostrarResumen() {
        const { width, height } = this.scale;

        this.capaResumen = this.add
            .rectangle(0, 0, width * 2, height * 2, 0x000000, 0.8)
            .setOrigin(0);

        this.textoResumen = this.add
            .text(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                this.textos.tutorial.bocadillos.resumen,
                {
                    fontSize: "48px",
                    fill: "#ffffff",
                    align: "center",
                    backgroundColor: "#000000"
                }
            )
            .setOrigin(0.5);
    }

    update() {
        //scroll del cielo
        this.ventana1.x -= this.scrollSpeed;
        this.ventana2.x -= this.scrollSpeed;
        this.ventana3.x -= this.scrollSpeed;

        if (this.ventana1.x + this.ventana1.width <= 0)
            this.ventana1.x = Math.max(this.ventana2.x, this.ventana3.x) + this.ventana1.width;
        if (this.ventana2.x + this.ventana2.width <= 0)
            this.ventana2.x = Math.max(this.ventana1.x, this.ventana3.x) + this.ventana2.width;
        if (this.ventana3.x + this.ventana3.width <= 0)
            this.ventana3.x = Math.max(this.ventana1.x, this.ventana2.x) + this.ventana3.width;

        
        //EVENTOS LLAMADA / MENSAJE
        if (this.paso === "esperando_evento") {
            const num = Phaser.Math.Between(0, 2);

            if (num === 0 && this.masLLamada) {
                this.entraLLamada = true;
                this.paso = "llamada";

                this.telefonoTutorial.anims.play("telefono");

                this.capa = this.add
                    .image(0, 0, "tutorialT")
                    .setScale(this.cameras.main.height / this.fondo.height)
                    .setPosition(
                        this.cameras.main.width / 2,
                        this.cameras.main.height / 2
                    );

                this.instruccionTexto = this.add
                    .text(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY - 200,
                        this.textos.tutorial.bocadillos.telefono,
                        { fontSize: "48px", fill: "#ffffff" }
                    )
                    .setOrigin(0.5);
            }

            if (num === 1 && this.masMensaje) {
                this.entraMensaje = true;
                this.paso = "mensaje";

                this.movil.anims.play("movil");

                this.capa = this.add
                    .image(0, 0, "tutorialM")
                    .setScale(this.cameras.main.height / this.fondo.height)
                    .setPosition(
                        this.cameras.main.width / 2,
                        this.cameras.main.height / 2
                    );

                this.instruccionTexto = this.add
                    .text(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY - 200,
                        this.textos.tutorial.bocadillos.movil,
                        { fontSize: "48px", fill: "#ffffff" }
                    )
                    .setOrigin(0.5);
            }
        }
    }
}
