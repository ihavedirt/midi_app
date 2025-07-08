'use client';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  CardMedia,
  Grid,
  Button
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function GamesDashboard() {
  return (
    <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#aaa', // Dark gray background
      }}
    >
      <ResponsiveAppBar />
      
      <Box sx={{ p: 3 }}>
        {/* Featured Game Mode */}
        
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
                        <img src="images/hero_mode.jpg" alt="Image 1" />

                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box sx={{ 
                        height: '500px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' }}
                    >
                        <img src="images/sight_read.png" alt="Image 2" />

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
        
        {/* Games section */}
        <Typography variant="h5" gutterBottom>
          Games
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia 
                component="img"
                height="140"
                image="/images/hero_mode.jpg"
                alt="Hero Mode"
              />
              <CardContent>

                <Typography variant="h6">
                  Hero Mode
                </Typography>

              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardMedia 
                component="img"
                height="140"
                image="/images/sight_read.png"
                alt="Sight Read"
              />
              <CardContent>

                <Typography variant="h6">
                  Sight Read
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}