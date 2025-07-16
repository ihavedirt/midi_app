'use client';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Card, Slider, Typography } from '@mui/material';
import { useState } from 'react';

export default function SettingsMenu({ onClose }) {
  const [volume, setVolume] = useState(50);

  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue);
  };

  return (
    <Box
      sx={{
        position: 'relative',
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
          position: 'relative'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>

        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
          size="small"
        >
          <CloseIcon />
        </IconButton>

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
