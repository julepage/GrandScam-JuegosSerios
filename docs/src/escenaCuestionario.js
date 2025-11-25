// export default class EscenaCuestionario extends Phaser.Scene {
//     constructor() {
//         super({ key: 'cuestionario' });
//     }

//     preload() {
//         this.load.json('es', 'assets/es.json');
//     }

//     create() {
//         // Cámara principal
//         const cam = this.cameras.main;
//         const centerX = cam.width / 2;
//         const centerY = cam.height / 2;

//         // Cargar JSON
//         const textos = this.cache.json.get('es');
//         this.textos = textos.cuestionario;

//         // Defaults
//         this.defaults = this.textos.defaults;

//         //findo
//         this.add.image(centerX, centerY, 'fondoC').setOrigin(0.5, 0.5).setScale(0.54);

//         // Título
//         this.add.text(centerX, centerY - 250, this.textos.titulo, {
//             fontSize: '32px',
//             color: '#ffffff',
//         }).setOrigin(0.5);

//         // Variables iniciales
//         this.playerData = {
//             nombre: '',
//             edad: '',
//             mascota: '',
//             calle: '',
//             color: ''
//         };

//         // Campos del formulario
//         this.inputFields = [];
//         const lbl = (key) => this.textos.campos[key];

//         // Espaciado entre campos
//         const startY = centerY - 150;
//         const gap = 80;

//         // Campos obligatorios
//         this.createInputField(centerX, startY, `${lbl('nombre')}*`, 'nombre', true);
//         this.createInputField(centerX, startY + gap, `${lbl('edad')}*`, 'edad', true);

//         // Campos opcionales
//         this.createInputField(centerX, startY + gap * 2, `Nombre de tu ${lbl('mascota')} \n(si no tienes,\n no contestes)`, 'mascota', false);
//         this.createInputField(centerX, startY + gap * 3, lbl('calle'), 'calle', false);
//         this.createInputField(centerX, startY + gap * 4, lbl('color'), 'color', false);

//         // Botón
//         const boton = this.add.text(centerX, startY + gap * 5.2, this.textos.botonComenzar, {
//             fontSize: '28px',
//             backgroundColor: '#801736ff',
//             padding: { x: 20, y: 10 },
//             color: '#ffffff',
//         }).setOrigin(0.5).setInteractive();

//         boton.on('pointerdown', () => this.submitForm());

//         // Mensaje error
//         this.mensajeError = this.add.text(centerX, startY + gap * 6.05, '', {
//             fontSize: '27px',
//             color: '#22ff00ff',
//         }).setOrigin(0.5);

//         // Campo activo inicial
//         this.activeField = this.inputFields[0];
//         this.updateActiveBox(this.activeField);

//         // Teclado
//         this.input.keyboard.on('keydown', this.handleTyping, this);
//         this.input.keyboard.on('keydown-TAB', (event) => {
//             event.preventDefault();
//             this.focusNextInput();
//         });
//         this.input.keyboard.on('keydown-ENTER', () => this.submitForm());
//         this.input.keyboard.on('keydown-UP', () => this.focusPrevInput());
//         this.input.keyboard.on('keydown-DOWN', () => this.focusNextInput());
//     }

//     createInputField(x, y, labelText, fieldKey, required = true) {
//         this.add.text(x - 180, y, `${labelText}:`, {
//             fontSize: '24px',
//             color: required ? '#ffffff' : '#cccccc',
//             align: 'right',
//         }).setOrigin(1, 0.5);

//         const box = this.add.rectangle(x + 60, y, 320, 40, 0x333333)
//             .setStrokeStyle(2, 0xffffff)
//             .setOrigin(0.5)
//             .setInteractive();

//         const text = this.add.text(x + 60, y, '', {
//             fontSize: '22px',
//             color: '#ffffff',
//         }).setOrigin(0.5);

//         box.fieldKey = fieldKey;
//         box.textObj = text;
//         box.required = required;

//         box.on('pointerdown', () => {
//             this.activeField = box;
//             this.updateActiveBox(box);
//         });

//         this.inputFields.push(box);
//     }

//     updateActiveBox(activeBox) {
//         this.inputFields.forEach(box => {
//             box.setStrokeStyle(2, box === activeBox ? 0xFF0055//si quieres que se vea mas 0x00ff00 que es verde

//                 : 0xffffff);
//         });
//     }

//     focusNextInput() {
//         if (!this.inputFields.length) return;
//         let idx = this.inputFields.indexOf(this.activeField);
//         idx = (idx + 1) % this.inputFields.length;
//         this.activeField = this.inputFields[idx];
//         this.updateActiveBox(this.activeField);
//     }

//     focusPrevInput() {
//         if (!this.inputFields.length) return;
//         let idx = this.inputFields.indexOf(this.activeField);
//         idx = (idx - 1 + this.inputFields.length) % this.inputFields.length;
//         this.activeField = this.inputFields[idx];
//         this.updateActiveBox(this.activeField);
//     }

//     handleTyping(event) {
//         if (!this.activeField) return;

//         const field = this.activeField;
//         const key = event.key;

//         if (this.playerData[field.fieldKey] == null) this.playerData[field.fieldKey] = '';

//         if (key === 'Backspace') {
//             this.playerData[field.fieldKey] = this.playerData[field.fieldKey].slice(0, -1);
//         } else if (key.length === 1) {
//             this.playerData[field.fieldKey] += key;
//         }

//         field.textObj.setText(this.playerData[field.fieldKey]);
//     }

//     submitForm() {
//         // Comprobar obligatorios
//         const faltan = this.inputFields.some(box =>
//             box.required && (!this.playerData[box.fieldKey] || this.playerData[box.fieldKey].trim().length === 0)
//         );

//         if (faltan) {
//             this.mensajeError.setText(this.textos.errorCampos);
//             return;
//         }

//         // Asignar defaults a opcionales vacíos
//         this.inputFields.forEach(box => {
//             const key = box.fieldKey;
//             let value = this.playerData[key]?.trim();
//             if (!box.required && (!value || value.length === 0)) {
//                 value = this.defaults[key] || '';
//             }
//             this.playerData[key] = value;
//         });

//         // Guardar datos globales
//         this.registry.set('playerData', this.playerData);
//         this.registry.set('cuestionarioCompletado', true);

//         // Ir a siguiente escena
//         this.scene.stop('juego');
//         this.scene.start('juego', { playerData: this.playerData });
//     }
// }

export default class EscenaCuestionario extends Phaser.Scene {
    constructor() {
        super({ key: 'cuestionario' });
        this.usandoTecladoNativo = false; // ← NUEVO
    }

    preload() {
        this.load.json('es', 'assets/es.json');
    }

    create() {
        // Cámara principal
        const cam = this.cameras.main;
        const centerX = cam.width / 2;
        const centerY = cam.height / 2;

        // Cargar JSON
        const textos = this.cache.json.get('es');
        this.textos = textos.cuestionario;
        this.defaults = this.textos.defaults;

        // Fondo
        this.add.image(centerX, centerY, 'fondoC').setOrigin(0.5).setScale(0.54);

        // Título
        this.add.text(centerX, centerY - 250, this.textos.titulo, {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Variables iniciales
        this.playerData = {
            nombre: '',
            edad: '',
            mascota: '',
            calle: '',
            color: ''
        };

        // Campos del formulario
        this.inputFields = [];
        const lbl = (key) => this.textos.campos[key];

        // Espaciado
        const startY = centerY - 150;
        const gap = 80;

        // Campos obligatorios
        this.createInputField(centerX, startY, `${lbl('nombre')}*`, 'nombre', true);
        this.createInputField(centerX, startY + gap, `${lbl('edad')}*`, 'edad', true);

        // Opcionales
        this.createInputField(centerX, startY + gap * 2, `Nombre de tu ${lbl('mascota')} \n(si no tienes,\n no contestes)`, 'mascota', false);
        this.createInputField(centerX, startY + gap * 3, lbl('calle'), 'calle', false);
        this.createInputField(centerX, startY + gap * 4, lbl('color'), 'color', false);

        // Botón
        const boton = this.add.text(centerX, startY + gap * 5.2, this.textos.botonComenzar, {
            fontSize: '28px',
            backgroundColor: '#801736ff',
            padding: { x: 20, y: 10 },
            color: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        boton.on('pointerdown', () => this.submitForm());

        // Mensaje error
        this.mensajeError = this.add.text(centerX, startY + gap * 6.05, '', {
            fontSize: '27px',
            color: '#22ff00ff',
        }).setOrigin(0.5);

        // Campo activo inicial
        this.activeField = this.inputFields[0];
        this.updateActiveBox(this.activeField);

        // Teclado físico
        this.input.keyboard.on('keydown', this.handleTyping, this);
        this.input.keyboard.on('keydown-TAB', (event) => {
            event.preventDefault();
            this.focusNextInput();
        });
        this.input.keyboard.on('keydown-ENTER', () => this.submitForm());
        this.input.keyboard.on('keydown-UP', () => this.focusPrevInput());
        this.input.keyboard.on('keydown-DOWN', () => this.focusNextInput());
    }

    createInputField(x, y, labelText, fieldKey, required = true) {
        this.add.text(x - 180, y, `${labelText}:`, {
            fontSize: '24px',
            color: required ? '#ffffff' : '#cccccc',
            align: 'right',
        }).setOrigin(1, 0.5);

        const box = this.add.rectangle(x + 60, y, 320, 40, 0x333333)
            .setStrokeStyle(2, 0xffffff)
            .setOrigin(0.5)
            .setInteractive();

        const text = this.add.text(x + 60, y, '', {
            fontSize: '22px',
            color: '#ffffff',
        }).setOrigin(0.5);

        box.fieldKey = fieldKey;
        box.textObj = text;
        box.required = required;

        box.on('pointerdown', () => {
            this.activeField = box;
            this.updateActiveBox(box);
            this.showNativeKeyboard(box);
        });

        this.inputFields.push(box);
    }

    updateActiveBox(activeBox) {
        this.inputFields.forEach(box => {
            box.setStrokeStyle(2, box === activeBox ? 0xFF0055 : 0xffffff);
        });
    }

    focusNextInput() {
        if (!this.inputFields.length) return;
        let idx = this.inputFields.indexOf(this.activeField);
        idx = (idx + 1) % this.inputFields.length;
        this.activeField = this.inputFields[idx];
        this.updateActiveBox(this.activeField);
    }

    focusPrevInput() {
        if (!this.inputFields.length) return;
        let idx = this.inputFields.indexOf(this.activeField);
        idx = (idx - 1 + this.inputFields.length) % this.inputFields.length;
        this.activeField = this.inputFields[idx];
        this.updateActiveBox(this.activeField);
    }

    handleTyping(event) {
        if (this.usandoTecladoNativo) return;

        if (!this.activeField) return;

        const field = this.activeField;
        const key = event.key;

        if (this.playerData[field.fieldKey] == null) this.playerData[field.fieldKey] = '';

        if (key === 'Backspace') {
            this.playerData[field.fieldKey] = this.playerData[field.fieldKey].slice(0, -1);
        } else if (key.length === 1) {
            this.playerData[field.fieldKey] += key;
        }

        field.textObj.setText(this.playerData[field.fieldKey]);
    }

    // 🔥 NUEVA FUNCIÓN PARA MOSTRAR TECLADO NATIVO
    showNativeKeyboard(box) {
        const input = document.getElementById("phaserInput");

        this.usandoTecladoNativo = true;
        input.value = this.playerData[box.fieldKey] || "";

        // Posición del campo en la pantalla
        const b = box.getBounds();
        const rect = this.game.canvas.getBoundingClientRect();

        const x = rect.left + b.centerX - 50;
        const y = rect.top + b.centerY - 20;

        // El input DEBE estar visible y tocable
        input.style.left = x + "px";
        input.style.top = y + "px";
        input.style.opacity = 0.2;
        input.style.width = "120px";
        input.style.height = "40px";
        input.style.pointerEvents = "auto";

        // Pequeño delay para que Safari no ignore el focus
        setTimeout(() => {
            input.focus();
        }, 30);

        input.oninput = () => {
            box.textObj.setText(input.value);
            this.playerData[box.fieldKey] = input.value;
        };

        input.onblur = () => {
            this.usandoTecladoNativo = false;

            input.style.opacity = 0;
            input.style.pointerEvents = "none";
            input.style.left = "0px";
            input.style.top = "0px";
        };
    }


    submitForm() {
        // Comprobar obligatorios
        const faltan = this.inputFields.some(box =>
            box.required && (!this.playerData[box.fieldKey] || this.playerData[box.fieldKey].trim().length === 0)
        );

        if (faltan) {
            this.mensajeError.setText(this.textos.errorCampos);
            return;
        }

        // Defaults en opcionales vacíos
        this.inputFields.forEach(box => {
            const key = box.fieldKey;
            let value = this.playerData[key]?.trim();
            if (!box.required && (!value || value.length === 0)) {
                value = this.defaults[key] || '';
            }
            this.playerData[key] = value;
        });

        // Guardar datos globales
        this.registry.set('playerData', this.playerData);
        this.registry.set('cuestionarioCompletado', true);

        // Cambiar escena
        this.scene.stop('juego');
        this.scene.start('juego', { playerData: this.playerData });
    }
}

