'use client';

import { Box, Card, Slider, Typography } from '@mui/material';
import { useState } from 'react';

export default function SettingsMenu() {
  const [volume, setVolume] = useState(50);

  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.5)', // optional: darken background like a modal
        zIndex: 9999, // ensures it’s on top
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>

        <Typography gutterBottom>Volume</Typography>
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Volume"
        />
        <Typography variant="body2" color="text.secondary">
          {volume}%
        </Typography>
      </Card>
    </Box>
  );
}
