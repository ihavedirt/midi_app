import * as React from 'react';
import { Box, Typography, Button, Slider } from "@mui/material";
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeDown from '@mui/icons-material/VolumeDown';

export default function InstrumentSettingsSlideDrawer({ onVolumeChange, defaultVolume=80 }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);

  const handleVolumeChange = (_, volume) => {
    setVolume(volume);
    onVolumeChange(volume);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '75%',
        position: 'absolute',
        right: isPanelOpen ? '0' : '-536px', // Entire drawer slides in/out
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
          color: '#C0C0C0',
          padding: '8px 0',
        }}>
          <Typography>Instrument Settings</Typography>
        </span>
      </Button>

      {/* Panel content */}
      <Box
        sx={{
          width: '500px',
          backgroundColor: '#505050',
          borderLeft: '1px solid #808080',
          padding: '16px',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)', // TODO: this needs to be fixed
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ color: '#d4d4d4ff' }}>
            Instrument Settings
          </Typography>

          <Typography sx={{ color: '#d4d4d4ff' }}>VOLUME</Typography>
          <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mr: 20, color: '#a0a0a0' }}>
            <VolumeDown />
            <Slider value={volume} min={0} max={127} step={1} color='#a0a0a0' onChange={handleVolumeChange}></Slider>
            <VolumeUp />
          </Stack>

          <Typography sx={{ color: '#d4d4d4ff' }}>REVERB</Typography>
          <Typography sx={{ color: '#d4d4d4ff'}}>More functions coming soon</Typography>
        </Box>
      </Box>
    </Box>
  );
}