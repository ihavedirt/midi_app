import * as React from 'react';
import "../styles/Keyboard.css";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function generateKeys(octaves) {
  const startOctave = 4 - Math.floor(octaves/2); // TODO: this needs to be fixed, but these need to be based on commercial standards
  const endOctave = 4 + Math.floor(octaves/2);

  const keys = [];
  for (let octave = startOctave; octave <= endOctave; octave++) {
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      keys.push({
        note,
        fullName: note + octave,
        isSharp: note.includes("#")
      });
    }
  }
  return keys;
}

export default function Keyboard({ octaves, activeNotes = [] }) {
  const keys = generateKeys(octaves);

  return (
    <div className="keyboard">
      {keys.map(({ note, fullName, isSharp }) => {
        const isActive = activeNotes.includes(fullName);

        return (
          <div
            key={fullName}
            className={`key ${isSharp ? "black" : "white"} ${isActive ? "active" : ""}`}
          >
            <span className="label">{fullName}</span>
          </div>
        );
      })}
    </div>
  );
}
