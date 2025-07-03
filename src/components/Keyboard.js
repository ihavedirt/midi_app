import React from "react";
import "../styles/Keyboard.css";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const startOctave = 2;
const endOctave = 5;

function generateKeys() {
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

export default function Keyboard({ activeNotes = [] }) {
  const keys = generateKeys();

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
