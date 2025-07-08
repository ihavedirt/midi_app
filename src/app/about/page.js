'use client';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { 
  Box,
  Card,
  Typography 
} from '@mui/material';


export default function AboutPage() {
    return (
        <Box>
            <ResponsiveAppBar />
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: 'calc(100vh - 64px)', // account for AppBar height
                backgroundColor: '#f3f3f3',
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
                        This app is designed to let you play the keyboard in a contained and easy to use environment. 
                    </Typography>
                    <Typography variant="body1">
                        It features various games and exercises to make learning fun and engaging.
                    </Typography>
                    <Typography variant="body1">
                        I would love to hear your feedback and suggestions. Send me an email at: davidbaik1001@gmail.com
                    </Typography>
                    <Typography variant="subtitle1">
                        David B
                    </Typography>
                </Card>
            </Box>
        </Box>
    );
}