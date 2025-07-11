'use client';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { 
  Box,
  Card,
  Typography 
} from '@mui/material';


export default function AboutPage() {
    return (
            <Box sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#aaa', // Dark gray background
            }}>
            <ResponsiveAppBar />
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                p: 5,
                }}
            >
                <Card
                    sx={{
                        width: '100%',
                        maxWidth: 600,
                        p: 4,
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        About This App
                    </Typography>
                    <Typography variant="body1">
                        This app is an interactive music keyboard software for MIDI keyboards available for all platforms. 
                    </Typography>
                    <Typography variant="body1">
                        It features various games and exercises to make learning and playing more fun.
                    </Typography>
                    <Typography variant="body1">
                        I'm accessible at: davidbaik1001@gmail.com
                    </Typography>
                    <Typography variant="subtitle1">
                        David B
                    </Typography>
                </Card>
            </Box>
        </Box>
    );
}