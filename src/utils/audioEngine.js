
import { SplendidGrandPiano, DrumMachine, Soundfont } from "smplr";

export function midiNoteToName(noteNumber) {
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const octave = Math.floor(noteNumber / 12) - 1;
  const note = notes[noteNumber % 12];
  return note + octave;
}

export class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.instrument = null;
    this.instrumentType = null;
    this.initialized = false;
  }

  // this is kinda useless as is, had it cuz I was using Tone.js before, I want to keep it for now
  async init() {
    if (this.initialized) return;

    this.audioContext = new AudioContext();

    // Some browsers require context to be resumed on gesture?
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    this.initialized = true;
    
    console.log("AudioEngine initialized");
  }

  async setInstrument(type) {
    if (!this.initialized) {
      throw new Error("AudioEngine not initialized");
    }

    // Dispose previous instrument if applicable
    if (this.instrument?.dispose) {
      this.instrument.dispose();
    }

    switch (type) {
      case "piano":
        this.instrument = await new Soundfont( this.audioContext, { instrument: "acoustic_grand_piano"} ).load;
        this.instrumentType = "smplr";
        break;

      case "synth":
        this.instrument = await new Soundfont( this.audioContext, { instrument: "synth_choir"} ).load;
        this.instrumentType = "smplr";
        break;

      case "electric_guitar":
        this.instrument = await new Soundfont( this.audioContext, { instrument: "electric_guitar_clean"} ).load;
        this.instrumentType = "smplr";
        break;

      case "bass":
        this.instrument = await new Soundfont( this.audioContext, { instrument: "electric_bass_finger"} ).load;
        this.instrumentType = "smplr";
        break;

      case "violin":
        this.instrument = await new Soundfont( this.audioContext, { instrument: "violin"} ).load;
        this.instrumentType = "smplr";
        break;

      case "trumpet":
        this.instrument = await new Soundfont( this.audioContext, { instrument: "trumpet"} ).load;
        this.instrumentType = "smplr";
        break;

      case "drums":
        this.instrument = new DrumMachine( this.audioContext );
        this.instrumentType = "smplr";
        break;

      default:
        console.warn(`Unknown instrument type: ${type}`);
        break;
    }

    console.log(`Instrument set to: ${type}`);
  }

  playNote(note, velocity) {
    if (!this.instrument) {
      return;
    }
    console.log(`Playing note: ${note} with velocity: ${velocity}`);
    this.instrument.start({ note, velocity });
  }

  stopNote(note) {
    if (!this.instrument) {
      return;
    }
    console.log(`Instrument: ${this.instrument.config.instrument}, Stopping note: ${note}`);

    this.instrument.stop(note);
  }
}
