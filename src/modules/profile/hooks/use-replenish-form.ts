import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container } from 'typedi';
import { ProfileStore } from '../stores/profile-store';

const validationSchema = yup.object({
  cost: yup.number().required('Введите сумму'),
});

export const useReplenishForm = (closeFormCb?: () => void) => {
  const profileStore = Container.get(ProfileStore);
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
  } = useFormik({
    initialValues: {
      cost: 0,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (formValues) => {
      await profileStore.replenishBalance(formValues);
      await Promise.all([
        profileStore.getProfileDetails(),
        profileStore.getLastActivity(),
      ]);
      closeFormCb?.();
    },
  });

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
    isLoading: profileStore.isLoadingReplenish,
  };
};
