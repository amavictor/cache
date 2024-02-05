import * as yup from "yup"

export const AuthSchema = yup.object().shape({
    firstName: yup.string().required("Please enter your firstname"),
    lastName: yup.string().required("Please enter your lastname"),
    email: yup.string().email().required("Please enter your email"),
    userName: yup.string().required("Please enter your username"),
    password: yup
        .string()
        .required("Please enter your password")
        .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref('password'), null], 'Passwords must match'), // Validation to ensure password match
});

export const ProfessionSchema = yup.object().shape({
    profession: yup.string().required("Please enter your profession"),
});

export const LoginSchema = yup.object().shape({
    identifier: yup.string().email().required("Please enter your email"),
    password: yup
        .string()
        .required("Please enter your password")
        .min(6, 'Password must be at least 6 characters long'),
});

export const ForgotPasswordSchema = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
});

export const ResetPasswordSchema = yup.object().shape({
    newPassword: yup
        .string()
        .required("Please enter your password")
        .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export const LocationSchema = yup.object().shape({
    country: yup.mixed().required("Please select your country"),
    region: yup.string().required("Please select a region")
});

export const BioSchema = yup.object().shape({
    headline: yup.string().required("Please enter a headline"),
    bio: yup.string().required("Please enter a bio"),
    website: yup
        .string()
        .required('Please enter a website')
        .url('Please enter a valid URL')
        .test('is-https', 'Please enter a valid HTTPS link', (value) => {
            // Check if the URL starts with 'https://'
            if (value && value.startsWith('https://')) {
                return true;
            }
            return false;
        }),
});

