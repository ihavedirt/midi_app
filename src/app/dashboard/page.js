'use client';
import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import InstrumentSelector from "@/components/InstrumentSelector";
import KeyboardContainer from "@/components/KeyboardContainer";
import InstrumentSettingsSlideDrawer from "@/components/InstrumentSettingsSlideDrawer";
import { setupMIDI, setMIDIMessageHandler } from "@/utils/midiHandler";
import { AudioEngine, midiNoteToName } from "@/utils/audioEngine";

export default function Dashboard() {
  const [activeNotes, setActiveNotes] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const engineRef = useRef(null);

  useEffect(() => {
    engineRef.current = new AudioEngine();
  }, []);

  // Initialize the audio engine on user gesture
  useEffect(() => {
    const initOnUserGesture = async () => {
      try {
        await engineRef.current.init();
        await engineRef.current.setInstrument("piano");
        setInitialized(true);
      } catch (err) {
        console.error("Failed to initialize audio engine:", err);
      } finally {
        window.removeEventListener('click', initOnUserGesture);
        window.removeEventListener('keydown', initOnUserGesture);
      }
    };

    window.addEventListener('click', initOnUserGesture);
    window.addEventListener('keydown', initOnUserGesture);

    return () => {
      window.removeEventListener('click', initOnUserGesture);
      window.removeEventListener('keydown', initOnUserGesture);
    };
  }, []);

  // MIDI message handling
  useEffect(() => {
    if (!initialized) return;

    console.log("engineRef.current:", engineRef.current);


    const handleMIDI = (msg) => {
      const [status, noteNumber, velocity] = msg.data;
      //const note = midiNoteToName(noteNumber); // some instruments use note numbers, others use note names
      const note = noteNumber; 

      if (status === 144 && velocity > 0) {
        engineRef.current.playNote(note, velocity);
        setActiveNotes((prev) => [...prev, note]);
      }

      else if (status === 128 || (status === 144 && velocity === 0)) {
        engineRef.current.stopNote(note);
        setActiveNotes((prev) => prev.filter(n => n !== note));
      }
    };

    setMIDIMessageHandler(handleMIDI);
    setupMIDI();

    return () => {
      setMIDIMessageHandler(null);
    };
  }, [initialized]);

  const handleInstrumentChange = (InstrumentName) => {
    engineRef.current.setInstrument(InstrumentName);
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#808080', // Dark gray background
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
            left: 20,
            top: '55%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            height: '100%',
          }}
        >
          <InstrumentSelector onChange={handleInstrumentChange}/>
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
        <KeyboardContainer activeNotes={activeNotes}/>
      </Box>

    </Box>
  );
}