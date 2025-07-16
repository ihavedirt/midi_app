'use client';
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import KeyboardContainer from "@/components/KeyboardContainer";
import MenuScreen from "@/app/games/hero-mode/hero-mode-components/menuScreen"
import GameScreen from "@/app/games/hero-mode/hero-mode-components/gameScreen"
import EndScreen from "@/app/games/hero-mode/hero-mode-components/endScreen"
import SettingsPopup from "@/app/games/hero-mode/hero-mode-components/settingsPopup"
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { HeroGameEngine } from '@/utils/HeroGameEngine';


export default function HeroModeContainer() {
  const [screen, setScreen] = useState('start');
  const [showSettings, setShowSettings] = useState(false);
  const gameEngineRef = useRef(null);

  const toggleSettings = () => {
    if (showSettings) {
      setShowSettings(false);
      gameEngineRef.current?.resume();
    } else {
      setShowSettings(true);
      gameEngineRef.current?.pause();
    }
  };

  const gameEngine = new HeroGameEngine();

  gameEngine.loadSong();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#808080',
      }}
    >
      {/* Responsive AppBar at the top */}
      <ResponsiveAppBar />

      {/* Main content area */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#e0e0e0',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#808080',
        }}
      >
        {/* Settings Button */}
        <IconButton
          onClick={toggleSettings}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: '#505050',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#707070',
            },
          }}
        >
          <SettingsIcon />
        </IconButton>

        {/* Settings popup */}
        {showSettings && (
          <SettingsPopup onClose={toggleSettings} />
        )}

        {/* Menu screen */}
        {screen === 'menu' && (
          <MenuScreen
            onSelectSong={(song) => {
              setSelectedSong(song);
              setScreen('playing');
            }}
          />
        )}

        {/* Game play screen */}
        {screen === 'playing' && (
          <GameScreen
            song={selectedSong}
            gameEngineRef={gameEngineRef}
            onGameEnd={() => setScreen('end')}
          />
        )}

        {/* post game screen */}
        {screen === 'end' && (
          <EndScreen onRestart={() => setScreen('start')} />
        )}
      </Box>

      {/* Keyboard component at the bottom */}
      <Box>
        <KeyboardContainer />
      </Box>

    </Box>
  );
}