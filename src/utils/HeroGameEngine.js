import { Midi } from '@tonejs/midi';

export class HeroGameEngine {

    constructor() {
        this.playerNotes = [];
        this.currentSongName = "";
        this.isPlaying = false;
        this.startTime = 0;
        this.lastTime = 0;
        this.deltaTime = 0;
    }

    async loadSong(midiFileUrl) {
        const midiFile = await Midi.fromUrl("/songs/Coldplay - Viva La Vida.mid")
        console.log(midiFile.header.tempos);
        midiFile.tracks.forEach((track, trackIndex) => {
            console.log(`Track ${trackIndex}: ${track.name}`);

            track.notes.forEach(note => {
                console.log({
                midi: note.midi,
                name: note.name,
                time: note.time,
                duration: note.duration
                });
            });
        });
    }

    startGame() {
        this.isPlaying = true;
        this.startTime = performance.now();
        this.lastTime = this.startTime;
        this.gameLoop();
    }

    gameLoop() {
        if (!this.isPlaying) return;

        // Calculating delta time
        const currentTime = performance.now();
        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        updateAndRenderGame();

        requestAnimationFrame(() => this.gameLoop());
    }

    updateAndRenderGame() {
        // find which note to create

        // create the note

        // modify positions of existing notes
    }

    // this provides the pause and resume for the settings popup to use later
    pause() {
        this.isRunning = false;
    }

    resume() {
        this.isRunning = true;
        this.gameLoop();
    }
}