import * as Tone from 'tone';

// This function takes the midi note number and converts it to Tone.js readable notation
export function midiNoteToName(noteNumber) {
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const octave = Math.floor(noteNumber / 12) - 1;
  const note = notes[noteNumber % 12];
  return note + octave;
}

// The AudioEngine class holds all the actual instruments and functions, these should be called
// via the audioContextProvider
export class AudioEngine {
  constructor() {
    this.instrument = null;
    this.initialized = false; // Flag to check if the engine is initialized with an instrument
  }

  // This function returns a list of instruments that can be used in the app
  // this might be better to move to separate file
  static getInstruments() {
    return [
      { 
        label: 'Piano', 
        value: 'piano', 
        initialize: () => new Tone.PolySynth() 
      },
      { 
        label: 'Grand Piano', 
        value: 'grand piano', 
        initialize: () => new Tone.PolySynth()
      },
      { 
        label: 'Synth', 
        value: 'synth', 
        initialize: () => new Tone.PolySynth() 
      },
      { 
        label: 'Electric Guitar', 
        value: 'guitar', 
        initialize: () => new Tone.PolySynth() 
      },
      { 
        label: 'Bass', 
        value: 'bass', 
        initialize: () => new Tone.PolySynth() 
      },
      { 
        label: 'Violin', 
        value: 'violin', 
        initialize: () => new Tone.PolySynth() 
      },
      { 
        label: 'Trumpet', 
        value: 'trumpet', 
        initialize: () => new Tone.PolySynth() 
      },
    ];
  }

  // This function initializes the audio engine, called in audioContextProvider
  async init() {
    if (this.initialized) return;

    await Tone.start(); // ensure user has interacted, tone.js requires user interaction to start audio
    this.instrument = AudioEngine.getInstruments()[0].initialize().toDestination(); // Initialize the first instrument
    this.initialized = true;
    console.log("AudioEngine initialized");
  }

  // This function plays a note with the given velocity, called in the audioContextProvider
  playNote(note, velocity) {
    if (!this.initialized) {
      console.warn("AudioEngine not initialized");
      return;
    }
    this.instrument.triggerAttack(note, Tone.now(), velocity);
  }

  // This function stops a note, called in the audioContextProvider
  stopNote(note) {
    if (!this.initialized) {
      console.warn("AudioEngine not initialized");
      return;
    }
    this.instrument.triggerRelease(note, Tone.now());
  }

  // This function sets the volume of the instrument
  setVolume(value) {
    if (!this.initialized) {
      console.warn("AudioEngine not initialized");
      return;
    }
    this.instrument.volume.value = value;
  }

  // This function changes the instrument to a new one, disconnects the old one
  changeInstrument(newInstrument) {
    if (this.instrument) {
      this.instrument.disconnect();
    }
    this.instrument = newInstrument.toDestination();
  }
}


// this is an example of chaining effects and ADSR envelopes
/*
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