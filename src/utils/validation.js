import * as Yup from 'yup'

export const loginValidation = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().required('Requerido'),
})

export const registerValidation = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().required('Requerido'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Requerido'),
})