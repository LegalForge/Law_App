import React from 'react';
import { Card, Grid, Typography, Container, Box } from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon
} from '@mui/icons-material';

const StatCard = ({ title, value, icon }) => (
  <Card sx={{ p: 3, height: '100%' }}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4">
          {value}
        </Typography>
      </Box>
      {icon}
    </Box>
  </Card>
);

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Students"
            value="1,234"
            icon={<PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Active Courses"
            value="42"
            icon={<SchoolIcon sx={{ fontSize: 40, color: 'success.main' }} />}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Assignments"
            value="156"
            icon={<AssignmentIcon sx={{ fontSize: 40, color: 'warning.main' }} />}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Upcoming Events"
            value="8"
            icon={<EventIcon sx={{ fontSize: 40, color: 'error.main' }} />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 