import * as React from 'react';
import Keyboard from "@/components/Keyboard";
import { Box } from "@mui/material";

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

            </Box>
            <Keyboard />
        </Box>
    );
}