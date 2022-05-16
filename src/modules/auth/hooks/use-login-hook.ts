import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container } from 'typedi';
import { AuthStore } from '../stores/auth-store';

const validationSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().min(4).max(32).required(),
});

export const useLoginHook = () => {
  const authStore = Container.get(AuthStore);
  const {
    values,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (submitValues) => {
      await authStore.loginUser({
        nickname: submitValues.login,
        password: submitValues.password,
      });
    },
  });

  return {
    values,
    handleChange,
    handleSubmit,
  };
};
