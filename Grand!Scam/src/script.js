import EscenaMenu from './escenaMenu.js';
import EscenaCarga from './escenaCarga.js';
import Juego from './juego.js';
import EscenaTelefono from './escenaTelefono.js';
import EscenaPausa from './escenaPausa.js';
import EscenaMovil from './escenaMovil.js';


const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, // Ancho de la ventana
    height: window.innerHeight, // Alto de la ventana
    scene: [EscenaCarga, EscenaMenu, Juego, EscenaTelefono, EscenaMovil, EscenaPausa], // Aquí defines tus escenas
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta el canvas para que ocupe toda la pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH // Centra el canvas
    }
};

window.game = new Phaser.Game(config);
