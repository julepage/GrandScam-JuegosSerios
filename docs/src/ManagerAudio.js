export default class ManagerAudioextends {
    constructor(scene) {
        this.scene = scene;

        this.musicas = [];
        this.efectos = [];

        this.volumenMusica = 0.5;
        this.volumenFx = 0.666666666666666666;
    }

    vM() {
        return this.volumenMusica;
    }

    vFx() {
        return this.volumenFx;
    }

    mute(m) {
        if (m) {
            this.musicas.forEach(m => m.setVolume(0));
            this.efectos.forEach(e => e.setVolume(0));
        }
        else {
            this.musicas.forEach(m => m.setVolume(this.volumenMusica));
            this.efectos.forEach(e => e.setVolume(this.volumenFx));
        }
    }

    musica(key) {
        const musica = this.scene.sound.add(key, {
            loop: true,
            volume: this.volumenMusica,
        });
        this.musicas.push(musica);
        return musica;
    }

    fx(key) {
        const fx = this.scene.sound.add(key, {
            volume: this.volumenFx,
        });
        this.efectos.push(fx);
        return fx;
    }

    volMusica(valor) {
        this.volumenMusica = valor;
        this.musicas.forEach(m => m.setVolume(valor));
    }

    stopMusic() {
        this.musicas.forEach(m => m.stop());
    }

    volFx(valor) {
        this.volumenFx = valor;
        this.efectos.forEach(e => e.setVolume(valor));
    }
}