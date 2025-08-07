import { Midi } from '@tonejs/midi';
import noteComponent from '@/components/note';

export class HeroGameEngine {

    constructor(onNoteSpawned) {
        this.playerNotes = [];
        this.spawnedNotes = [];
        this.currentSongName = "";
        this.bpm = 0;
        this.isPlaying = false;
        this.startTime = 0; // time the song started
        this.lastTime = 0; // temp time holder
        this.deltaTime = 0; // time elapsed since last tick
        this.elapsedTime = 0; // total time elapsed
        this.songDuration = 0;
        this.noteLeadTime = 2; // seconds
        this.onNoteSpawned = onNoteSpawned;
    }

    async loadSong(midiFileUrl) {
        const midiFile = await Midi.fromUrl(midiFileUrl)

        this.bpm = midiFile.header.tempos[0].bpm;

        midiFile.tracks[0].notes.forEach(note => { // the zero'th idx is specific to this midi file
            this.playerNotes.push({                 //TO DO: need to figure out how to get the correct track when multiple tracks are present in the file
                midi: note.midi,
                name: note.name,
                time: note.time, // In seconds
                duration: note.duration // Also in seconds
            });
        });

        this.songDuration = Math.max(...this.playerNotes.map(note => note.time + note.duration)); // this computes the end of the song
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
        this.elapsedTime = (currentTime - this.startTime) / 1000;

        this.updateAndRenderGame();

        requestAnimationFrame(() => this.gameLoop());
    }

    updateAndRenderGame() {
        // find which note to create
        while (this.playerNotes.length > 0 && this.playerNotes[0].time <= this.elapsedTime) {
            const note = this.playerNotes.shift();
            console.log(note);
            if (this.onNoteSpawned) {
                this.onNoteSpawned(note); // Call React to render note
            }
        }

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