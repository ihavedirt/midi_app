'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { AudioEngine, midiNoteToName } from '@/audio/audioEngine';
import { setupMIDI, setMIDIMessageHandler } from '@/midi/midiHandler';

const AudioContext = createContext();

export function AudioContextProvider({ children }) {
  const [engine] = useState(() => new AudioEngine());

  useEffect(() => {

    // Initializes the audio engine
    const initAudioEngine = async () => {
      await engine.init();
    };
    initAudioEngine();


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
  }, [engine]);

  return (
    <AudioContext.Provider value={{ engine }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}