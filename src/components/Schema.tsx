import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/[$@^.*+?()[\]{}|\\]/, 'Password must contain special characters'),
});
