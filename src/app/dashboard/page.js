'use client';
import { useEffect, useState } from "react";
import * as Tone from "tone";
import { Grid, Box, Button } from "@mui/material";
import Keyboard from "/src/components/Keyboard";
import ResponsiveAppBar from '/src/components/ResponsiveAppBar';

export default function Dashboard() {

  const [isPanelOpen, setIsPanelOpen] = useState(false);

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
      <Box sx={{ flexShrink: 0 }}>
        <ResponsiveAppBar/>
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
        }}
      >
        {/* Combined drawer container */}
        <Box
          sx={{
            display: 'flex',
            height: '66.66%',
            position: 'absolute',
            right: isPanelOpen ? '0' : '-336px', // Entire drawer slides in/out
            transition: 'right 0.3s ease',
              '&:hover': {
                transform: !isPanelOpen ? 'translateX(-12px)' : 'none', // Only when closed
              },
              transition: !isPanelOpen ? 'transform 0.2s ease, right 0.3s ease' : 'right 0.3s ease',
            }}
        >
          {/* Drawer button */}
          <Button
            variant="contained"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            sx={{
              width: '48px',
              minWidth: '48px',
              height: '100%',
              borderRadius: '12px 0 0 12px',
              padding: 0,
              backgroundColor: '#505050',
              '&:hover': {
                backgroundColor: '#606060',
              },
            }}
          >
            <span style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              color: '#909090',
              padding: '8px 0',
            }}>
              Instrument Settings
            </span>
          </Button>

          {/* Panel content */}
          <Box
            sx={{
              width: '300px',
              backgroundColor: '#505050',
              borderLeft: '1px solid #ddd',
              padding: '16px',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.1)', // TODO: this needs to be fixed
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="outlined">VOLUME</Button>
              <Button variant="outlined">EFFECTS</Button>
              <Button variant="outlined">PRESETS</Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Keyboard component at the bottom */}
      <Box sx={{ flexShrink: 0 }}>
        <Keyboard />
      </Box>

    </Box>
  );
}

//MIDIAccess docs: https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess
//PolySynth docs: https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html