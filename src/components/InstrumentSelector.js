'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PianoIcon from '@mui/icons-material/Piano';
import { useAudio } from '@/contexts/AudioContextProvider';
import { AudioEngine } from '@/audio/audioEngine';

export default function InstrumentList() {
  const { engine } = useAudio();
  const instrumentList = AudioEngine.getInstruments();

  // Initialize the first instrument in the list as selected
  const [selected, setSelected] = useState(instrumentList[0].value);

  // sets the instrument in the audio engine
  const handleSelect = (instrument) => {
    console.log(`Selected instrument: ${instrument.value}`);

    // sets the state for the UI
    setSelected(instrument.value);

    // initialize the instrument and set it in the audio engine
    const newInstrument = instrument.initialize();
    engine.changeInstrument(newInstrument);
  };

  // This returns an icon based on the instrument name
  const getIcon = (name) => {
    switch (name) {
      case 'Piano': return <PianoIcon />;
      case 'Synth': return <PianoIcon />;
      case 'AM Synth': return <PianoIcon />;
      case 'Electric Guitar': return <MusicNoteIcon />;
      case 'Bass': return <MusicNoteIcon />;
      case 'Violin': return <MusicNoteIcon />;
      case 'Trumpet': return <MusicNoteIcon />;
      default: return <PianoIcon />;
    }
  };

  return (
    <Box // I think this shit needs to be in dashboard/page.js
      sx={{
        width: '250px',
        height: '100%',
        bgcolor: '#505050',
        color: 'white',
        display: 'flex',
        flexDirection: 'column', 
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#909090',
            borderRadius: '3px',
          },
        }}
      >
        <nav aria-label="instrument selection">
          <List>
            {instrumentList.map((instrument, index) => (
              // Apparently its a good idea to wrap this shit in React.Fragment for rendering?
              <React.Fragment key={instrument.value}> 
                <ListItem disablePadding>
                  {/* Button stuff starts here. Button has Icon and Text */}
                  <ListItemButton
                    onClick={() => handleSelect(instrument)}
                    sx={{
                      '&:hover': { backgroundColor: '#606060' },
                      px: 3,
                      py: 1.5,
                      bgcolor: selected === instrument.value ? '#909090' : 'inherit', // this sets the background color if the selected instrument is this button's
                    }}
                  >

                    <ListItemIcon sx={{ color: 'inherit', minWidth: '36px' }}>
                      {getIcon(instrument.label)}
                    </ListItemIcon>

                    <ListItemText primary={instrument.label} />

                  </ListItemButton>
                </ListItem>

                {/* Divider between list items */}
                <Divider sx={{ bgcolor: '#606060' }} />
              </React.Fragment>
            ))}
          </List>
        </nav>
      </Box>
    </Box>
  );
}
