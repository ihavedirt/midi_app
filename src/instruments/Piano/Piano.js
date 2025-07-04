import { useCallback } from 'react';
import { useAudioEngine } from '../../contexts/AudioContextProvider';
import Keyboard from '../../components/Keyboard';

export default function PianoInstrument() {
  const { playNote } = useAudioEngine();

  const handleKeyPress = useCallback((note, velocity) => {
    playNote('piano', note, velocity);
  }, [playNote]);

  return (
    <Box>

    </Box>
    
  );
}