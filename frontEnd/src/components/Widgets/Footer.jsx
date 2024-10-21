import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--footer-bg)', 
        padding: '20px 0', 
        textAlign: 'center',
        width: '100%',
        
      }}
    >
      <Typography variant="body1" sx={{ margin: 0, color: 'var(--wht)' }}>
        © {new Date().getFullYear()} Reacher. Developed for Marychild Academy. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ margin: '5px 0', color: 'var(--wht)' }}>
        <Link 
          href="/privacy-policy" 
          sx={{ color: 'var(--link-color)', textDecoration: 'none', marginRight: '10px' }}
        >
          Privacy Policy
        </Link>
        |
        <Link 
          href="/terms-of-service" 
          sx={{ color: 'var(--link-color)', textDecoration: 'none', marginLeft: '10px' }}
        >
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;





