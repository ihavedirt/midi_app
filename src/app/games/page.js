'use client';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  CardMedia,
  Grid,
  CardActionArea
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useRouter} from 'next/navigation';

export default function GamesDashboard() {
  // This cuz theres routing on this page, remove if cards become components
  const router = useRouter();

  return (
    <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#aaa',
      }}
    >
      <ResponsiveAppBar />
      
      {/* Featured game mode Swiper */}
      <Box sx={{ p: 3 }}>
        <Card sx={{ mb: 3 }}>
            <Swiper 
              pagination={true}
              autoplay={{
                delay: 30000,
                disableOnInteraction: false
              }} 
              Pagination={{ 
                clickable: true,
              }}
              navigation={true}
              style={{
                "--swiper-pagination-color": "#000",
                "--swiper-navigation-color": "#000",
                backgroundColor: "#666"
              }}
              modules={[Navigation, Pagination, Autoplay]} 
              className="mySwiper"
            >
                <SwiperSlide>
                    <Box sx={{ 
                        height: '500px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' }}
                    >
                        <img 
                          src="images/hero_mode.jpg" 
                          alt="Image 1" 
                          style={{
                            width: '100%',
                        }}/>

                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box sx={{ 
                        height: '500px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' }}
                    >
                        <img 
                          src="images/sight_read.png" 
                          alt="Image 2" 
                          style={{
                            width: '100%',
                        }}/>

                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box sx={{ 
                        height: '500px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' }}
                    >

                        <Typography variant="h4" gutterBottom>
                            Featured Game Mode 3
                        </Typography>

                    </Box>
                </SwiperSlide>
            </Swiper>
        </Card>
        
        {/* Games section header*/}
        <Typography variant="h5" gutterBottom>
          Games
        </Typography>
        <Grid container spacing={2}>
  {/* Hero Mode Card */}
  <Grid item xs={12} sm={6}>
    <Card sx={{ width: 300, height: 400, display: 'flex', flexDirection: 'column' }}>
      <CardActionArea
        onClick={() => router.push('/games/hero-mode')}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          image="/images/hero_mode.jpg"
          alt="Hero Mode"
          sx={{ width: '100%', flexGrow: 1, objectFit: 'cover' }}
        />

        {/* Bottom overlay */}
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.4)',
            color: 'black',
            py: 1,
          }}
        >
          <Typography variant="h6">Hero Mode</Typography>
        </Box>
      </CardActionArea>
    </Card>
  </Grid>

  {/* Sight Read Card */}
  <Grid item xs={12} sm={6}>
    <Card sx={{ width: 300, height: 400, display: 'flex', flexDirection: 'column' }}>
      <CardActionArea
        onClick={() => router.push('/games/sight-read')}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          image="/images/sight_read.png"
          alt="Sight Read"
          sx={{ width: '100%', flexGrow: 1, objectFit: 'cover' }}
        />
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.4)',
            color: 'black',
            py: 1,
          }}
        >
          <Typography variant="h6">Sight Read</Typography>
        </Box>
      </CardActionArea>
    </Card>
  </Grid>
</Grid>

      </Box>
    </Box>
  );
}