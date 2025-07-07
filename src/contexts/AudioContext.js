import { createContext, useContext } from 'react';
import { AudioEngine } from '../audio/engine';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [engine] = useState(() => new AudioEngine());
  
  return (
    <AudioContext.Provider value={engine}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);