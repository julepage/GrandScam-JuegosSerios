export default class EscenaCuestionario extends Phaser.Scene {
    constructor() {
        super({ key: 'cuestionario' });
    }

    preload() {
        // Cargamos el JSON base una vez
        this.load.json('es', 'assets/es.json');
    }

    create() {
        this.add.text(400, 80, 'Introduce tus datos', {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Variables de los datos
        this.playerData = { nombre: '', edad: '' };

        // Campos
        this.createInputField(400, 200, 'Nombre', 'nombre');
        this.createInputField(400, 300, 'Edad', 'edad');

        // Botón
        const boton = this.add.text(400, 420, 'Comenzar', {
            fontSize: '28px',
            backgroundColor: '#00aa00',
            padding: { x: 20, y: 10 },
            color: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        boton.on('pointerdown', () => {
            if (this.playerData.nombre && this.playerData.edad) {
                this.scene.start('juego', { playerData: this.playerData });
            } else {
                this.mensajeError.setText('Por favor, completa todos los campos.');
            }
        });

        // Mensaje de error
        this.mensajeError = this.add.text(400, 480, '', {
            fontSize: '20px',
            color: '#ff5555',
        }).setOrigin(0.5);

        // Escuchar teclado
        this.input.keyboard.on('keydown', this.handleTyping, this);

        // Campo activo
        this.activeField = null;
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

        //guardar referencia
        box.fieldKey = fieldKey;
        box.textObj = text;

        //click para activar
        box.on('pointerdown', () => {
            this.activeField = box;
            this.updateActiveBox(box);
        });
    }

    updateActiveBox(activeBox) {
        //desactiva todos los cuadros y marca el activo
        this.children.list.forEach(obj => {
            if (obj.type === 'Rectangle') {
                obj.setStrokeStyle(2, obj === activeBox ? 0x00ff00 : 0xffffff);
            }
        });
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
}
