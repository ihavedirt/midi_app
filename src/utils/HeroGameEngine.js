import { Midi } from '@tonejs/midi';

export class HeroGameEngine {

    constructor() {
        this.playerNotes = [];
        this.spawnedNotes = [];
        this.currentSongName = "";
        this.isPlaying = false;
        this.startTime = 0; // time the song started
        this.lastTime = 0; // temp time holder
        this.deltaTime = 0; // time elapsed since last tick
        this.elapsedTime = 0; // total time elapsed
        this.songTotalTime = 0;
    }

    async loadSong(midiFileUrl) {
        const midiFile = await Midi.fromUrl("/songs/Coldplay - Viva La Vida.mid")
        console.log(`Song bpm: ${midiFile.header.tempos[0].bpm}`);
        console.log(midiFile.tracks);

        midiFile.tracks[0].notes.forEach(note => { // the zero'th idx is specific to this midi file
            this.playerNotes.push({                 //TO DO: need to figure out how to get the correct track when multiple tracks are present in the file
                midi: note.midi,
                name: note.name,
                time: note.time, // In seconds
                duration: note.duration // Also in seconds
            });
        });

        this.songTotalTime = Math.max(...this.playerNotes.map(note => note.time + note.duration)); // this computes the end of the song
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
        this.elapsedTime = currentTime - this.startTime;

        this.updateAndRenderGame();

        requestAnimationFrame(() => this.gameLoop());
    }

    updateAndRenderGame() {
        // find which note to create
        return;

        // spawn the note

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