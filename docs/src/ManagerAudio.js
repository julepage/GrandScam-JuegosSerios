export default class ManagerAudioextends {
    constructor(scene) {
        this.scene = scene;

        this.musicas = [];
        this.efectos = [];

        this.volumenMusica = 1;
        this.volumenFx = 1;
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

    volumenMusica(valor) {
        this.volumenMusica = valor;
        this.musicas.forEach(m => m.setVolume(valor));
    }

    volumenFx(valor) {
        this.volumenFx = valor;
        this.efectos.forEach(e => e.setVolume(valor));
    }
}