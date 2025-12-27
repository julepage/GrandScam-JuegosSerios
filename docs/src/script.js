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
import TutorialTelefono from './escenaTutorialTelefono.js';
import TutorialMovil from './escenaTutorialMovil.js';
import RespuestaCasos from './escenaRespuestaCasos.js';
import EscenaReflexion from './escenaReflexion.js';

window.GameData = {
    tracker: new SeriousGameTracker()
}

GameData.tracker.trackerSettings.activity_id="https://limesurvey.simva-beta.e-ucm.es/227815?lang=es";
GameData.tracker.trackerSettings.generateSettingsFromURLParams=false;
GameData.tracker.trackerSettings.batch_endpoint = "https://myendpoint.com";
GameData.tracker.trackerSettings.actor_homePage = "https://myhomepage.com";
GameData.tracker.trackerSettings.actor_name = "username";
GameData.tracker.start();
GameData.tracker.completable(
  "GrandScamSession",
  GameData.tracker.COMPLETABLETYPE.Session
)
.initialized()
.send();

const config = {
    type: Phaser.AUTO,
    width: 1600, // Ancho de la ventana
    height: 900, // Alto de la ventana
    scene: [EscenaCarga,EscenaCuestionario, EscenaMenu, Juego, EscenaTelefono, EscenaMovil,
         EscenaPausa, EscenaOpciones, Victoria, Derrota, Tutorial, RespuestaCasos, TutorialMovil, TutorialTelefono, EscenaReflexion], // Aquí defines tus escenas
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta el canvas para que ocupe toda la pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH // Centra el canvas
    }
};

window.game = new Phaser.Game(config);
