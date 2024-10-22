import React from 'react';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Btns({ onClick }) {  
  return (
    <Button
      variant="loginbtn"
      onClick={onClick}  
      sx={{
        display: 'inline-block',
        padding: '15px 35px',
        background: 'var(--sec)',
        color: 'var(--wht)',
        fontSize: 'var(--p-font)',
        fontWeight: 500,
        letterSpacing: '1px',
        borderRadius: '3rem',
        transition: 'all 0.50s ease',
        '&:hover': {
          background: 'var(--pri)',
          color: 'var(--wht)',
          boxShadow: 'var(--pri) 0px 1px 25px',
        },
      }}
    >
      Login <ChevronRightIcon sx={{ verticalAlign: 'middle', marginLeft: '9px' }} />
    </Button>
  );
}

export default Btns;


