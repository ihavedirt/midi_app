'use client';
import { useEffect, useState } from "react";
import * as Tone from "tone";
import { Box } from "@mui/material";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import InstrumentSelector from "@/components/InstrumentSelector";
import KeyboardContainer from "@/components/KeyboardContainer";
import InstrumentSettingsSlideDrawer from "@/components/InstrumentSettingsSlideDrawer";

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
        // Print information about the MIDI controller connection
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
      {/* Responsive AppBar at the top */}
      <Box>
        <ResponsiveAppBar />
      </Box>

      {/* Main content area */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#e0e0e0',
          display: 'flex',
          justifyContent: 'flex-end', // Aligns children to the right
          alignItems: 'center',      // Centers vertically
          position: 'relative',      // For percentage-based height
          overflow: 'hidden', // Prevents overflow
          bgcolor: '#808080',
        }}
      >
        {/* Instrument selector on the left */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            height: '100%',
          }}
        >
          <InstrumentSelector />
        </Box>

        {/* Combined drawer container */}
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: '10%',
            zIndex: 1,
            height: '100%',
          }}
        >
          <InstrumentSettingsSlideDrawer />
        </Box>
      </Box>

      {/* Keyboard component at the bottom */}
      <Box>
        <KeyboardContainer />
      </Box>

    </Box>
  );
}

//MIDIAccess docs: https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess
//PolySynth docs: https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html