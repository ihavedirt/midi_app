import * as React from 'react';
import Keyboard from "@/components/Keyboard";
import { Box, Button, TextField } from "@mui/material";

export default function KeyboardContainer({ activeNotes }) {
    return (
        <Box>
            <Box sx={{
            width: '100%',
            height: '35px',
            backgroundColor: '#404040',
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            }}>
                <Button variant="contained" sx={{
                    width: '200px',
                    padding: 0,
                    backgroundColor: '#505050',
                }}
                >
                Current MIDI Device
                </Button>

                <TextField 
                    id="outlined-basic" 
                    label="Octaves" 
                    variant="outlined" 
                    sx={{ 
                        width: '100px',
                        marginLeft: '10px',
                        marginRight: '10px',
                    }}
                />
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