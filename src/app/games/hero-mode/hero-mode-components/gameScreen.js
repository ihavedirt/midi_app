'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroGameEngine } from '@/utils/HeroGameEngine';
import NoteComponent from '@/components/note';
import { Box } from '@mui/material';

export default function GameScreen() {
    const [spawnedNotes, setSpawnedNotes] = useState([]);
    const gameEngineRef = useRef(null);

    // Callback to receive note from engine
    const handleNoteSpawn = (note) => {
        setSpawnedNotes(prev => [...prev, note]);
    };

    useEffect(() => {
        const engine = new HeroGameEngine(handleNoteSpawn);
        gameEngineRef.current = engine;

        engine.loadSong("/songs/Coldplay - Viva La Vida.mid").then(() => {
            engine.startGame();
        });

        return () => {
            engine.pause();
        };
    }, []);

    return (
        <Box 
            sx={{ 
                width: '100%', 
                height: '100%', 
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#101010' 
            }}
        >
            {spawnedNotes.map((note, idx) => (
                <NoteComponent key={idx} note={note} />
            ))}
        </Box>
    );
}





