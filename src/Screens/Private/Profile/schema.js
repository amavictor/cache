import * as yup from "yup"

export const profileSchema = yup.object().shape({
    firstname: yup.string(),
    lastname: yup.string(),
    headline: yup.string(),
    country: yup.mixed(),
    region: yup.string(),
    bio: yup.string(),
    website: yup
        .string()
        // .required('Please enter a website')
        .url('Please enter a valid URL')
        .test('is-https', 'Please enter a valid HTTPS link', (value) => {
            // Check if the value is truthy and if the URL starts with 'https://'
            if (value && value.startsWith('https://')) {
                return true;
            }
            return false;
        }),
});
