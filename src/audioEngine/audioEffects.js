import * as Tone from "tone";

// Create reusable effect chains
export function createReverb(time = 2) {
  const reverb = new Tone.Reverb(time);
  reverb.wet.value = 0.5;
  reverb.generate(); // required to prepare the impulse
  return reverb;
}

export function createFilter(freq = 800, type = "lowpass") {
  const filter = new Tone.Filter(freq, type);
  filter.Q.value = 1;
  return filter;
}

export function createDelay(time = "8n", feedback = 0.4) {
  const delay = new Tone.FeedbackDelay(time, feedback);
  return delay;
}

// Optional: preset chains
export function createBasicChain() {
  const reverb = createReverb();
  const filter = createFilter(1000, "lowpass");

  // Connect chain manually
  reverb.connect(filter);
  return {
    input: reverb,
    output: filter,
  };
}