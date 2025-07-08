import * as React from 'react';
import Keyboard from "@/components/Keyboard";
import { Box, Button } from "@mui/material";

export default function KeyboardContainer({ activeNotes }) {
    return (
        <Box>
            <Box sx={{
            width: '100%',
            height: '35px',
            backgroundColor: '#404040',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            }}>
                <Button variant="contained" sx={{
                    right: '0',
                    width: '200px',
                    padding: 0,
                    backgroundColor: '#505050',
                }}
                >
                Current MIDI Device
                </Button>
            </Box>
            <Keyboard />

            <Box sx={{
                width: '100%',
                height: '10px',
                backgroundColor: '#404040',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
            </Box>
        </Box>
    );
}