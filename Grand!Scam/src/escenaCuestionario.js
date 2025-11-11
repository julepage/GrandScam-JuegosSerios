export default class EscenaCuestionario extends Phaser.Scene {
    constructor() {
        super({ key: 'cuestionario' });
    }

    preload() {
        this.load.json('es', 'assets/es.json');
    }

    create() {
        // Cargar JSON
        const textos = this.cache.json.get('es');
        this.textos = textos.cuestionario;

        // Defaults
        this.defaults = this.textos.defaults;

        // Título
        this.add.text(400, 80, this.textos.titulo, {
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

        // Campos obligatorios
        this.createInputField(400, 200, lbl('nombre') + '*', 'nombre', true);
        this.createInputField(400, 300, lbl('edad') + '*', 'edad', true);

        // Campos opcionales
        this.createInputField(400, 380, lbl('mascota'), 'mascota', false);
        this.createInputField(400, 460, lbl('calle'), 'calle', false);
        this.createInputField(400, 540, lbl('color'), 'color', false);

        // Botón
        const boton = this.add.text(400, 620, this.textos.botonComenzar, {
            fontSize: '28px',
            backgroundColor: '#00aa00',
            padding: { x: 20, y: 10 },
            color: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        boton.on('pointerdown', () => this.submitForm());

        // Mensaje error
        this.mensajeError = this.add.text(400, 680, '', {
            fontSize: '20px',
            color: '#ff5555',
        }).setOrigin(0.5);

        // Campo activo inicial
        this.activeField = this.inputFields[0];
        this.updateActiveBox(this.activeField);

        // Teclado
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
        this.add.text(x - 150, y, `${labelText}:`, {
            fontSize: '24px',
            color: required ? '#ffffff' : '#cccccc',
            align: 'right',
        }).setOrigin(1, 0.5);

        const box = this.add.rectangle(x + 50, y, 300, 40, 0x333333)
            .setStrokeStyle(2, 0xffffff)
            .setOrigin(0.5)
            .setInteractive();

        const text = this.add.text(x + 50, y, '', {
            fontSize: '22px',
            color: '#ffffff',
        }).setOrigin(0.5);

        box.fieldKey = fieldKey;
        box.textObj = text;
        box.required = required;

        box.on('pointerdown', () => {
            this.activeField = box;
            this.updateActiveBox(box);
        });

        this.inputFields.push(box);
    }

    updateActiveBox(activeBox) {
        this.inputFields.forEach(box => {
            box.setStrokeStyle(2, box === activeBox ? 0x00ff00 : 0xffffff);
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

    submitForm() {
        // Comprobar obligatorios
        const faltan = this.inputFields.some(box =>
            box.required && (!this.playerData[box.fieldKey] || this.playerData[box.fieldKey].trim().length === 0)
        );

        if (faltan) {
            this.mensajeError.setText(this.textos.errorCampos);
            return;
        }

        // Asignar defaults a opcionales vacíos
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

        // Ir a siguiente escena
        this.scene.start('juego', { playerData: this.playerData });
    }
}
