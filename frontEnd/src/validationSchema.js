import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const signinSchema = Yup.object().shape({
  username: Yup.string()
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const accountSchema = Yup.object().shape({
  lastName: Yup.string().required('Last Name is required'),
  firstName: Yup.string().required('First Name is required'),
  middleInitial: Yup.string().max(1, 'Middle Initial must be one character'),
  role: Yup.string().required('Role is required'),
  status: Yup.string().required('Status is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'), 
  lrn: Yup.string()
    .length(12, 'LRN must be exactly 12 digits')
    .matches(/^\d{12}$/, 'LRN must be a 12-digit number')
    .required('LRN is required'),
});

export const moduleSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
 
  // durationStart: Yup.date().required('Start date is required'), // Not needed for now nag eerror e
  // durationEnd: Yup.date().required('End date is required'), // Not needed for now
  fileURLs: Yup.array().min(1, 'At least one file is required'),
});
