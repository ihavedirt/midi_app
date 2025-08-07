'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {Card} from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PianoIcon from '@mui/icons-material/Piano';

export default function InstrumentList({ onChange}) {
  const instrumentList = [
    {label: 'Piano', value: 'piano'},
    {label: 'Synth', value: 'synth'},
    {label: 'Electric Guitar', value: 'electric_guitar'},
    {label: 'Bass', value: 'bass'},
    {label: 'Violin', value: 'violin'},
    {label: 'Trumpet', value: 'trumpet'},
    {label: 'Drums', value: 'drums'}
  ];

  // Initialize the first instrument in the list as selected
  const [selected, setSelected] = useState(instrumentList[0].value);

  // sets the instrument in the audio engine
  const handleSelect = (instrumentName) => {
    console.log(`Selected instrument: ${instrumentName}`);
    setSelected(instrumentName);
    onChange(instrumentName);
  };

  // This returns an icon based on the instrument name
  const getIcon = (name) => {
    switch (name) {
      case 'Piano': return <PianoIcon />;
      case 'Synth': return <PianoIcon />;
      case 'Electric Guitar': return <MusicNoteIcon />;
      case 'Bass': return <MusicNoteIcon />;
      case 'Violin': return <MusicNoteIcon />;
      case 'Trumpet': return <MusicNoteIcon />;
      case 'Drums': return <PianoIcon />;
      default: return <PianoIcon />;
    }
  };

  return (
    <Card>
      <Box // I think this stuff needs to be in dashboard/page.js
        sx={{
          width: '250px',
          height: '700px',
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
          <List>
            {instrumentList.map((instrument) => (
              // Apparently its a good idea to wrap this stuff in React.Fragment for rendering?
              <React.Fragment key={instrument.value}> 
                <ListItem disablePadding>
                  {/* Button stuff starts here. Button has Icon and Text */}
                  <ListItemButton
                    onClick={() => handleSelect(instrument.value)}
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
        </Box>
      </Box>
    </Card>
  );
}
