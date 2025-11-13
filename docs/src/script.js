import EscenaCarga from './escenaCarga.js';
import EscenaCuestionario from './escenaCuestionario.js';
import EscenaMenu from './escenaMenu.js';
import Juego from './juego.js';
import EscenaTelefono from './escenaTelefono.js';
import EscenaPausa from './escenaPausa.js';
import EscenaMovil from './escenaMovil.js';
import EscenaOpciones from './escenaOpciones.js';
import Victoria from './escenaVictoria.js';
import Derrota from './escenaDerrota.js';
import Tutorial from './escenaTutorial.js';
import RespuestaCasos from './escenaRespuestaCasos.js';


const config = {
    type: Phaser.AUTO,
    width: 1600, // Ancho de la ventana
    height: 900, // Alto de la ventana
    scene: [EscenaCarga,EscenaCuestionario, EscenaMenu, Juego, EscenaTelefono, EscenaMovil,
         EscenaPausa, EscenaOpciones, Victoria, Derrota, Tutorial, RespuestaCasos], // Aquí defines tus escenas
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta el canvas para que ocupe toda la pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH // Centra el canvas
    }
};

window.game = new Phaser.Game(config);
