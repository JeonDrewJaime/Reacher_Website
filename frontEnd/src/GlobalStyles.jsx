import { createGlobalStyle } from 'styled-components';
import OneTrickPonyFont from '../src/assets/fonts/OneTrickPony.ttf';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'OneTrickPony';
    src: url(${OneTrickPonyFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  :root {
    --pri: #FE81B9;
    --sec: #45b6d4;
    --blk: #292929;
    --wht: #FFFFFF;
    --gray: #9698a6;
    --gre: #d0e8a9;
    --drk-gre: #1f5967;
    --blu: #a6dae5;
    --footer-bg: #70bc4f;

    /* Font Size Variables */
    --big-font: 4.5rem;
    --h2-font: 2.3rem;
    --p-font: 1.1rem;
  }

  body {
    font-family: sans-serif; 
    color: var(--text-color); 
    background-color: var(--white); 
    margin: 0;

  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'OneTrickPony'; /* Use OneTrickPony for headings */
    font-weight: 20; /* Lessen font weight for titles */
    color: var(--sec); /* Heading color */
  }

  h1 {
    font-size: var(--big-font); /* Use big font size */
  }

  h2 {
    font-size: var(--h2-font); /* Use h2 font size */
  }

  p {
    font-size: var(--p-font); /* Use paragraph font size */
    font-weight: 400; /* Set a specific font weight */
    color: var(--gray); /* Set paragraph color */
  }
`;

export default GlobalStyles;


