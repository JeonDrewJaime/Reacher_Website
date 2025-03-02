import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import skybowImage from '../assets/skybow.png';

function Faqs() {
  const divStyle = {
    backgroundImage: `url(${skybowImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: 'calc(100vh - 64px)', 
    width: '100%',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', 
  };

  const [expanded, setExpanded] = React.useState(false);
  const faqs = [
    {
      question: "I forgot my password. How can I reset it?",
      answer:
        "If you can't remember the password associated with your account, please contact support at marychild@gmail.com for assistance. Provide any details you remember about your account to help locate it.",
    },
    {
      question: "I entered the correct password, but I still can't log in. What should I do?",
      answer:
        "Ensure that your Caps Lock key is off, as passwords are case-sensitive. Double-check your email address and password for any typos. If the issue persists, try clearing your browser's cache and cookies, or attempt logging in from a different browser.",
    },
    {
      question: "I'm unable to access the login page. What could be the problem?",
      answer:
        "First, check your internet connection. If your connection is stable, try accessing the site from a different browser or device. If you are still unable to access the page, clear your browser's cache and cookies. You may also want to check if the site is undergoing maintenance.",
    },
    {
      question: "My email address is not recognized. How can I log in?",
      answer:
        "Verify that you are using the correct email address associated with your account. If you have recently changed your email address, ensure you are using the updated one. If the problem persists, please contact support at marychild@gmail.com.",
    },
    {
      question: "I didn't receive the email to reset my password. What should I do?",
      answer:
        "Please check your spam or junk folder, as the email might have been filtered there. If you still do not receive the email, ensure that you are entering the correct email address associated with your account. If the issue continues, contact support at marychild@gmail.com.",
    },
    {
      question: "I can’t log in after resetting my password. What should I do?",
      answer:
        "Ensure you are using the most recent password reset link sent to your email. Double-check that there are no extra spaces before or after the password when copying it. If the issue persists, clear your browser’s cache and cookies or try logging in from a different browser.",
    },
    {
      question: "I can't remember my username for the account. How can I recover it?",
      answer:
        "If you can't remember the username associated with your account, please contact support at marychild@gmail.com for assistance. Provide any details you remember about your account to help locate it.",
    },
    {
      question: "For other concerns or assistance, how can I get help?",
      answer:
        "For other concerns or assistance, please send an email to marychild@gmail.com.",
    },
  ];
  

  const handleExpansion = (index) => {
    setExpanded(expanded === index ? false : index);
  };


  const containerStyle = {
    maxWidth: '80%',
    margin: '0 auto',
    padding: '0 20px',
    paddingTop: '20px', 
    '@media (max-width: 600px)': { 
      maxWidth: '95%',
      padding: '0 10px',
      paddingTop: '80px', 
    },
  };

  const accordionStyle = (isExpanded) => ({
    width: '100%',
    boxShadow: 'none',
    height: isExpanded ? 'auto' : '60px',
    overflow: 'hidden',
    transition: 'height 0.4s ease',
  });

  const summaryStyle = {
    fontSize: '1rem',
    color: 'var(--blk)',
    borderBottom: '1px solid var(--gray)',
    paddingBottom: '15px',
    width: '100%',
    '@media (max-width: 600px)': { 
      fontSize: '0.9rem',
    },
  };

  const answerStyle = {
    fontSize: '1rem',
    color: 'var(--gray)',
    '@media (max-width: 600px)': { 
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={divStyle}>
      <div style={containerStyle}>
        <h2 style={{ marginBottom: '5px', marginTop: '5px' }} data-aos="fade-right">Frequently Asked Questions</h2>
        <p style={{ marginBottom: '20px', textAlign: 'justify' }} data-aos="fade-left">
          Welcome to our Frequently Asked Questions section. 
          Here, you'll find answers to the most common inquiries related to our platform. 
          From account access issues to password recovery steps, 
          this page aims to assist you in resolving any problems you may encounter. 
          If you have further questions, feel free to reach out to our support team for personalized assistance.
        </p>

        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={() => handleExpansion(index)}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 400 }}
            style={accordionStyle(expanded === index)} 
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'var(--sec)', fontSize: '1.5rem' }} />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography style={summaryStyle}>
                <i className='bx bx-right-arrow-alt'></i> {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={answerStyle}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Faqs;






