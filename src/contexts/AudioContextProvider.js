'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { AudioEngine, midiNoteToName } from '@/audio/audioEngine';
import { setupMIDI, setMIDIMessageHandler } from '@/midi/midiHandler';

const AudioContext = createContext();

export function AudioContextProvider({ children }) {
  const [engine] = useState(() => new AudioEngine());
  const [initialized, setInitialized] = useState(false);

  // Tone.js requires user interaction to start audio context
  // This function waits for a user gesture to initialize the audio engine
  useEffect(() => {
    // Handle user interaction to start Tone.js safely
    const initOnUserGesture = async () => {
      try {
        await engine.init();
        setInitialized(true);

      } catch (err) {
        console.error("Failed to initialize audio engine:", err);
        
      } finally {
        // Remove listeners after initialization
        window.removeEventListener('click', initOnUserGesture);
        window.removeEventListener('keydown', initOnUserGesture);
      }
    };

    // Register event listeners
    window.addEventListener('click', initOnUserGesture);
    window.addEventListener('keydown', initOnUserGesture);

    // Apparently I need this to clean up in case of unmount before initialization?
    return () => {
      window.removeEventListener('click', initOnUserGesture);
      window.removeEventListener('keydown', initOnUserGesture);
    };
  }, [engine]);

  // MIDI message handler 
  useEffect(() => {
    // MIDI setup only after initialization
    if (!initialized) return;

    setMIDIMessageHandler((msg) => {
      const [status, noteNumber, velocity] = msg.data;
      const note = midiNoteToName(noteNumber);

      if (status === 144 && velocity > 0) {
        engine.playNote(note, velocity / 127);
      } else if (status === 128 || (status === 144 && velocity === 0)) {
        engine.stopNote(note);
      }
    });

    setupMIDI();

    // Cleanup MIDI message handler on unmount
    return () => {
      setMIDIMessageHandler(null);
    };

  }, [initialized, engine]);

  return (
    <AudioContext.Provider value={{ engine, initialized }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioEngine() {
  return useContext(AudioContext);
}
