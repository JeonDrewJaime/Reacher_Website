import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

function Faqs() {
  const [expanded, setExpanded] = React.useState(false);

  const faqs = [
    {
      question: "I forgot my password. How can I reset it?",
      answer:
        'Click on the "Forgot Password?" link on the login page. Enter your registered email address, and you\'ll receive a link to reset your password. If you do not receive an email, please check your spam or junk folder.',
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
      question: "I can't remember my email address for the account. How can I recover it?",
      answer:
        "If you can't remember the email address associated with your account, please contact support at marychild@gmail.com for assistance. Provide any details you remember about your account to help locate it.",
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

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <br />

      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={() => handleExpansion(index)}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography className="faq-question">
              <i className='bx bx-right-arrow-alt'></i> {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="faq-answer">
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}


export default Faqs;





