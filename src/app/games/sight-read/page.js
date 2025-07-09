'use client';
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import InstrumentSelector from "@/components/InstrumentSelector";
import KeyboardContainer from "@/components/KeyboardContainer";
import InstrumentSettingsSlideDrawer from "@/components/InstrumentSettingsSlideDrawer";

export default function SightRead() {

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#808080', // Dark gray background
      }}
    >
      {/* Responsive AppBar at the top */}
      <Box>
        <ResponsiveAppBar />
      </Box>

      {/* Main content area */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#e0e0e0',
          display: 'flex',
          justifyContent: 'flex-end', // Aligns children to the right
          alignItems: 'center',      // Centers vertically
          position: 'relative',      // For percentage-based height
          overflow: 'hidden', // Prevents overflow
          bgcolor: '#808080',
        }}
      >

      </Box>

      {/* Keyboard component at the bottom */}
      <Box>
        <KeyboardContainer />
      </Box>

    </Box>
  );
}