import * as Tone from 'tone';

export function midiNoteToName(noteNumber) {
  // This function takes the midi note number and converts it to Tone.js readable notation
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const octave = Math.floor(noteNumber / 12) - 1;
  const note = notes[noteNumber % 12];
  return note + octave;
}

export function handleMIDIMessage(msg) {
  const [status, noteNumber, velocity] = msg.data;
  const note = midiNoteToName(noteNumber);

  if (status === 144 && velocity > 0) {
    triggerNote(note, velocity);
  } else if (status === 128 || (status === 144 && velocity === 0)) {
    releaseNote(note);
  }
}

/*
import * as Tone from 'tone';
import { Soundfont } from 'soundfont-player';

export class AudioEngine {
  constructor() {
    this.instruments = {};
    this.activeInstrument = null;
    this.effects = {
      reverb: new Tone.Reverb(2).toDestination(),
      distortion: new Tone.Distortion(0.5).toDestination(),
      filter: new Tone.Filter(400, "lowpass").toDestination()
    };
    this.adsr = {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 0.5
    };
  }

  async loadInstrument(name) {
    if (!this.instruments[name]) {
      this.instruments[name] = await Soundfont.instrument(
        Tone.context, 
        name,
        { soundfont: 'MusyngKite' } // High-quality soundfont
      );
    }
    this.activeInstrument = name;
  }

  playNote(note) {
    if (!this.activeInstrument) return;
    
    const source = this.instruments[this.activeInstrument].start(note, Tone.now(), {
      gain: this.adsr.sustain,
      attack: this.adsr.attack,
      decay: this.adsr.decay,
      release: this.adsr.release
    });

    // Route through effects
    source.connect(this.effects.filter)
         .connect(this.effects.distortion)
         .connect(this.effects.reverb);
  }

  savePreset(name) {
    return {
      effects: { ...this.effects.get() },
      adsr: { ...this.adsr }
    };
  }

  loadPreset(preset) {
    Object.assign(this.adsr, preset.adsr);
    Object.entries(preset.effects).forEach(([effect, params]) => {
      this.effects[effect].set(params);
    });
  }
}*/