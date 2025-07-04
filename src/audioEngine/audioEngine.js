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

