import { createContext, useContext, useState } from "react";
import { loadInstrument } from "../audioEngine/InstrumentManager";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [instrumentName, setInstrumentName] = useState("synth");

  const switchInstrument = async (name) => {
    setInstrumentName(name);
    await loadInstrument(name);
  };

  return (
    <AudioContext.Provider value={{ instrumentName, switchInstrument }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);