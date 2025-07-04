import * as Tone from "tone";
// import { createReverb, createFilter, createDelay } from "./effects";

let currentInstrument = null;
let currentEffects = [];

export async function loadInstrument(name) {
  disposeCurrent();

  if (name === "synth") {
    const synth = new Tone.PolySynth();
    currentInstrument = synth;
  }

  /*if (name === "sample") {
    const sampler = new Tone.Sampler({
      urls: {
        C4: "C4.wav",
        E4: "E4.wav",
        G4: "G4.wav",
      },
      baseUrl: "/samples/piano/",
      onload: () => console.log("Sample loaded"),
    });
    currentInstrument = sampler;
  }*/

  connectToDestination();
}

export function triggerNote(note, velocity = 1) {
  currentInstrument?.triggerAttack?.(note, Tone.now(), velocity);
}

export function releaseNote(note) {
  currentInstrument?.triggerRelease?.(note);
}

// Add an effect and rewire the signal chain
export function addEffect(effectNode) {
  if (!currentInstrument) return;

  // Disconnect everything
  currentInstrument.disconnect();

  // Chain existing effects + new one
  currentEffects.push(effectNode);
  connectToDestination();
}

// Remove a specific effect by type (e.g., 'Reverb')
export function removeEffectByType(typeName) {
  currentEffects = currentEffects.filter(effect => {
    if (effect.constructor.name === typeName) {
      effect.disconnect();
      effect.dispose();
      return false;
    }
    return true;
  });

  connectToDestination();
}

// Clear all effects
export function clearEffects() {
  currentEffects.forEach(e => {
    e.disconnect();
    e.dispose();
  });
  currentEffects = [];
  connectToDestination();
}

// Util function that connects the current audio context to output
// instrument > effects > destination
function connectToDestination() {
  if (!currentInstrument) return;

  currentInstrument.disconnect();

  if (currentEffects.length === 0) {
    currentInstrument.toDestination();
    return;
  }

  // For chaining effects in series
  let chainStart = currentInstrument;
  for (let effect of currentEffects) {
    chainStart.connect(effect);
    chainStart = effect;
  }

  chainStart.toDestination();
}

// Cleanup instrument and effects
function disposeCurrent() {
  currentInstrument?.dispose?.();
  currentInstrument = null;

  clearEffects (); // Disconnect and remove effects
}
