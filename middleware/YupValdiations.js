import * as Yup from 'yup';

export const loginValidation = Yup.object({
    email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
    role: Yup.string()
        .required('Registration Type is required'),
});

export const signUpValidation = Yup.object({

    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First name required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Last name required'),
    email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!_%*#?&])[A-Za-z\d@_$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Required!')

});