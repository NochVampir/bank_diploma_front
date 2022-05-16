import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Container } from 'typedi';
import { AuthStore } from '../stores/auth-store';

const validationSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().min(4).max(32).required(),
});

export const useRegisterHook = () => {
  const navigate = useNavigate();
  const authStore = Container.get(AuthStore);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (submitValues) => {
      await authStore.registerUser({
        nickname: submitValues.login,
        password: submitValues.password,
      });
      navigate('/auth/login');
    },
  });

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
  };
};
