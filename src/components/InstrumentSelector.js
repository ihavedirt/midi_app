import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PianoIcon from '@mui/icons-material/Piano';
import GuitarIcon from '@mui/icons-material/Audiotrack';
import { INSTRUMENTS } from '../instruments';
import { useAudioEngine } from '../contexts/AudioContextProvider';

export default function InstrumentList() {
  const instruments = [
    { name: "Piano", icon: <PianoIcon /> },
    { name: "Grand Piano", icon: <PianoIcon /> },
    { name: "Synth", icon: <PianoIcon /> },
    { name: "Electric Guitar", icon: <GuitarIcon /> },
    { name: "Bass", icon: <MusicNoteIcon /> },
    { name: "Violin", icon: <MusicNoteIcon /> },
    { name: "Trumpet", icon: <MusicNoteIcon /> },
  ];

  return (
    <Box 
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
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#909090',
            borderRadius: '3px',
          },
        }}
      >
        <nav aria-label="instrument selection">
          <List dense>
            {instruments.map((instrument, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      '&:hover': { backgroundColor: '#606060' },
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: '36px' }}>
                      {instrument.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={instrument.name} 
                    />
                  </ListItemButton>
                </ListItem>
                {index < instruments.length - 1 && <Divider sx={{ bgcolor: '#606060' }} />}
              </React.Fragment>
            ))}
          </List>
        </nav>
      </Box>
      
      {/* Optional: Add empty space filler if list is short */}
      <Box sx={{ flex: '0 1 auto' }}></Box>
    </Box>
  );
}