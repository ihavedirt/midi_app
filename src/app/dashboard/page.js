'use client';
import { useEffect, useState } from "react";
import * as Tone from "tone";
import { Grid, Box } from "@mui/material";
import Keyboard from "/src/components/Keyboard";
import ResponsiveAppBar from '/src/components/ResponsiveAppBar';

export default function Dashboard() {

  function midiNoteToName(noteNumber) {
    // This function takes the midi note number and converts it to Tone.js readable notation
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const octave = Math.floor(noteNumber / 12) - 1;
    const note = notes[noteNumber % 12];
    return note + octave;
  }

  useEffect(() => {
    if (!navigator.requestMIDIAccess) {
      // navigator.requestMIDIAccess returns from a promise a [MIDIAccess] object
      // This is to check if the brower will support MIDIAccess
      console.warn("Web MIDI API not supported in this browser.");
      return;
    }

    navigator.requestMIDIAccess().then((midiAccess) => {

      midiAccess.onstatechange = (event) => {
        // Print information about the (dis)connected MIDI controller
        console.log(event.port.name, event.port.manufacturer, event.port.state);
      };

      // Setting up the synth
      const synth = new Tone.PolySynth().toDestination();
      synth.volume.value = -50;

      // This reads the input values from midi 
      for (let input of midiAccess.inputs.values()) {
        input.onmidimessage = (msg) => {
          const [status, noteNumber, velocity] = msg.data;
          const note = midiNoteToName(noteNumber);

          if (status === 144) {
            synth.triggerAttack(note, Tone.now(), velocity);
            console.log("attacked: " + note);
          } else if (status === 128) {
            synth.triggerRelease(note);
            console.log("released: " + note);
          }
        };
      }
    });
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <ResponsiveAppBar/>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#e0e0e0', // light grey
        }}
      >
        Main Content Area
      </Box>

      <Box sx={{ flexShrink: 0 }}>
        <Keyboard />
      </Box>
    </Box>
  );
}

//MIDIAccess docs: https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess
//PolySynth docs: https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html