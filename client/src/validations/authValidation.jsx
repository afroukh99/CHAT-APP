import * as Yup from 'yup'

export const registerSchema = Yup.object({
    username: Yup.string().required("Please enter a username!").min(3).max(13),
    email: Yup.string().required("Please enter a email!").email("Please enter a valid email!"),
    password: Yup.string().required("Please enter a password!").min(6).max(20),
    cpassword: Yup.string().required("please confirm your password!").oneOf([Yup.ref("password"),null],"Password mismatch")
})




export const loginValidation = Yup.object({
    username: Yup.string().required("Please enter a username!").min(3).max(13),
    password: Yup.string().required("Please enter a password!").min(6).max(20),
})


