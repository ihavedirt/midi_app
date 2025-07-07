import * as React from 'react';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function InstrumentSettingsSlideDrawer() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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
          Instrument Settings
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
          <Button variant="outlined">VOLUME</Button>
          <Button variant="outlined">EFFECTS</Button>
          <Button variant="outlined">PRESETS</Button>
        </Box>
      </Box>
    </Box>
  );
}