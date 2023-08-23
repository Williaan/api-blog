import * as yup from 'yup';
import { setLocale } from 'yup';
import { pt } from 'yup-locales';
setLocale(pt);

const validateUser = yup.object().shape({
    name: yup.string().required("O campo nome é obrigatório!"),
    email: yup.string().required("O campo e-mail é obrigatório!").email("Digite um E-mail válido!"),
    password: yup.string().required("O campo senha é obrigátório!").min(6, "A senha deve ter no minimo 6 digitos")
});


const validateAccess = yup.object().shape({
    email: yup.string().required("O campo e-mail é obrigatório!").email("Digite um E-mail válido!"),
    password: yup.string().required("O campo senha é obrigátório!").min(6, "A senha deve ter no minimo 6 digitos")
});


const validatePosts = yup.object().shape({
    title: yup.string().required("O campo titulo é obrigatório!"),
    description: yup.string().required("O campo descrição é obrigátório!")
});


export {
    validateUser,
    validateAccess,
    validatePosts
}