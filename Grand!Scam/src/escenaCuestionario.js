export default class EscenaCuestionario extends Phaser.Scene {
    constructor() {
        super({ key: 'cuestionario' });
    }

    preload() {
        // Carga JSON de textos
        this.load.json('es', 'assets/es.json');
    }

    create() {
        // Traemos JSON
        const textos = this.cache.json.get('es');
        this.textos = textos.cuestionario;

        // Título del formulario
        this.add.text(400, 80, this.textos.titulo, {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Variables de los datos
        this.playerData = { nombre: '', edad: '' };

        // Array de inputs en orden
        this.inputFields = [];

        // Crear campos usando labels del JSON
        this.createInputField(400, 200, this.textos.campos.nombre, 'nombre');
        this.createInputField(400, 300, this.textos.campos.edad, 'edad');

        // Botón "Comenzar"
        const boton = this.add.text(400, 420, this.textos.botonComenzar, {
            fontSize: '28px',
            backgroundColor: '#00aa00',
            padding: { x: 20, y: 10 },
            color: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        boton.on('pointerdown', () => {
            this.submitForm();
        });

        // Mensaje de error
        this.mensajeError = this.add.text(400, 480, '', {
            fontSize: '20px',
            color: '#ff5555',
        }).setOrigin(0.5);

        // Campo activo inicial
        this.activeField = this.inputFields[0];
        this.updateActiveBox(this.activeField);

        // Teclado
        this.input.keyboard.on('keydown', this.handleTyping, this);

        // TAB para cambiar campo
        this.input.keyboard.on('keydown-TAB', (event) => {
            event.preventDefault(); // Evita que el navegador cambie de foco
            this.focusNextInput();
        });

        // ENTER para enviar formulario
        this.input.keyboard.on('keydown-ENTER', () => this.submitForm());
    }

    createInputField(x, y, labelText, fieldKey) {
        this.add.text(x - 200, y, `${labelText}:`, {
            fontSize: '24px',
            color: '#ffffff',
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

        // Guardar referencia
        box.fieldKey = fieldKey;
        box.textObj = text;

        // Click para activar
        box.on('pointerdown', () => {
            this.activeField = box;
            this.updateActiveBox(box);
        });

        // Añadir al array de inputs
        this.inputFields.push(box);
    }

    updateActiveBox(activeBox) {
        // Borde verde para activo, blanco para los demás
        this.inputFields.forEach(box => {
            box.setStrokeStyle(2, box === activeBox ? 0x00ff00 : 0xffffff);
        });
    }

    focusNextInput() {
        if (!this.inputFields.length) return;

        let currentIndex = this.inputFields.indexOf(this.activeField);
        if (currentIndex === -1) currentIndex = 0;
        else currentIndex = (currentIndex + 1) % this.inputFields.length;

        this.activeField = this.inputFields[currentIndex];
        this.updateActiveBox(this.activeField);
    }

    handleTyping(event) {
        if (!this.activeField) return;

        const field = this.activeField;
        const key = event.key;

        if (key === 'Backspace') {
            this.playerData[field.fieldKey] = this.playerData[field.fieldKey].slice(0, -1);
        } else if (key.length === 1) {
            this.playerData[field.fieldKey] += key;
        }

        field.textObj.setText(this.playerData[field.fieldKey]);
    }

    submitForm() {
        // Verifica que todos los campos estén completos
        const todosCompletos = this.inputFields.every(box => this.playerData[box.fieldKey] && this.playerData[box.fieldKey].length > 0);

        if (todosCompletos) {
            // Guardar datos para toda la partida
            this.registry.set('playerData', this.playerData);
            this.registry.set('cuestionarioCompletado', true);

            // Ir a escena de juego
            this.scene.start('juego', { playerData: this.playerData });
        } else {
            this.mensajeError.setText(this.textos.errorCampos);
        }
    }
}
