'use client';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  Button
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function GamesDashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ResponsiveAppBar />
      
      <Box sx={{ p: 3 }}>
        {/* Featured Game Mode */}
        
        <Card sx={{ mb: 3 }}>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                <SwiperSlide>
                    <Box sx={{ 
                        height: '500px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' }}>
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box sx={{ 
                        height: '500px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' }}>
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box sx={{ 
                        height: '500px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' }}>
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
              <CardContent>
                <Typography variant="h6">Hero Mode</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Sight Read</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}