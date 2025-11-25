export default class EscenaCuestionario extends Phaser.Scene {
    constructor() {
        super({ key: 'cuestionario' });
    }

    preload() {
        this.load.json('es', 'assets/es.json');
    }

    create() {
        const cam = this.cameras.main;
        const centerX = cam.width / 2;
        const centerY = cam.height / 2;

        const textos = this.cache.json.get('es');
        this.textos = textos.cuestionario;
        this.defaults = this.textos.defaults;

        this.add.image(centerX, centerY, 'fondoC').setOrigin(0.5, 0.5).setScale(0.54);
        this.add.text(centerX, centerY - 250, this.textos.titulo, {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);

        this.playerData = { nombre: '', edad: '', mascota: '', calle: '', color: '' };
        this.inputFields = [];
        const lbl = (key) => this.textos.campos[key];

        const startY = centerY - 150;
        const gap = 80;

        this.createInputField(centerX, startY, `${lbl('nombre')}*`, 'nombre', true);
        this.createInputField(centerX, startY + gap, `${lbl('edad')}*`, 'edad', true);
        this.createInputField(centerX, startY + gap * 2, `Nombre de tu ${lbl('mascota')} \n(si no tienes,\n no contestes)`, 'mascota', false);
        this.createInputField(centerX, startY + gap * 3, lbl('calle'), 'calle', false);
        this.createInputField(centerX, startY + gap * 4, lbl('color'), 'color', false);

        const boton = this.add.text(centerX, startY + gap * 5.2, this.textos.botonComenzar, {
            fontSize: '28px',
            backgroundColor: '#801736ff',
            padding: { x: 20, y: 10 },
            color: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        boton.on('pointerdown', () => this.submitForm());

        this.mensajeError = this.add.text(centerX, startY + gap * 6.05, '', {
            fontSize: '27px',
            color: '#22ff00ff',
        }).setOrigin(0.5);

        this.activeField = this.inputFields[0];
        this.updateActiveBox(this.activeField);

        // Inicializar virtual keyboard
        this.virtualKeys = [];
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

        // Cuando se pulsa, activamos campo y mostramos teclado
        box.on('pointerdown', () => {
            this.activeField = box;
            this.updateActiveBox(box);
            this.hideVirtualKeyboard();           // cierra cualquier teclado anterior
            this.createVirtualKeyboard(box);      // abre teclado para este campo
        });

        this.inputFields.push(box);
    }

    updateActiveBox(activeBox) {
        this.inputFields.forEach(box => {
            box.setStrokeStyle(2, box === activeBox ? 0xFF0055 : 0xffffff);
        });
    }

    focusNextInput() { /* igual que antes */ }
    focusPrevInput() { /* igual que antes */ }
    handleTyping(event) { /* igual que antes */ }

    submitForm() {
        const faltan = this.inputFields.some(box =>
            box.required && (!this.playerData[box.fieldKey] || this.playerData[box.fieldKey].trim().length === 0)
        );
        if (faltan) {
            this.mensajeError.setText(this.textos.errorCampos);
            return;
        }
        this.inputFields.forEach(box => {
            const key = box.fieldKey;
            let value = this.playerData[key]?.trim();
            if (!box.required && (!value || value.length === 0)) value = this.defaults[key] || '';
            this.playerData[key] = value;
        });
        this.registry.set('playerData', this.playerData);
        this.registry.set('cuestionarioCompletado', true);
        this.scene.stop('juego');
        this.scene.start('juego', { playerData: this.playerData });
    }

    // =================== TECLADO VIRTUAL =====================
    createVirtualKeyboard(targetField) {
        const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        const startX = 100;
        const startY = 400;
        const keyWidth = 50;
        const keyHeight = 50;
        const gap = 5;

        keys.forEach((k, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;

            const key = this.add.text(
                startX + col * (keyWidth + gap),
                startY + row * (keyHeight + gap),
                k,
                { fontSize: '28px', backgroundColor: '#555', color: '#fff', padding: { x: 10, y: 10 } }
            ).setInteractive();

            key.on('pointerdown', () => {
                targetField.textObj.setText(targetField.textObj.text + k);
                this.playerData[targetField.fieldKey] = targetField.textObj.text;
            });

            this.virtualKeys.push(key);
        });

        // Tecla borrar
        const backspace = this.add.text(
            startX,
            startY + 4 * (keyHeight + gap),
            "⌫",
            { fontSize: '28px', backgroundColor: '#900', color: '#fff', padding: { x: 10, y: 10 } }
        ).setInteractive();
        backspace.on('pointerdown', () => {
            targetField.textObj.setText(targetField.textObj.text.slice(0, -1));
            this.playerData[targetField.fieldKey] = targetField.textObj.text;
        });
        this.virtualKeys.push(backspace);

        // Tecla cerrar teclado
        const closeKey = this.add.text(
            startX + 120,
            startY + 4 * (keyHeight + gap),
            "Cerrar",
            { fontSize: '28px', backgroundColor: '#333', color: '#fff', padding: { x: 10, y: 10 } }
        ).setInteractive();
        closeKey.on('pointerdown', () => {
            this.hideVirtualKeyboard();
        });
        this.virtualKeys.push(closeKey);
    }

    hideVirtualKeyboard() {
        if (!this.virtualKeys) return;
        this.virtualKeys.forEach(k => k.destroy());
        this.virtualKeys = [];
    }
}
