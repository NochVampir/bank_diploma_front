import { useFormik } from 'formik';
import { Container } from 'typedi';
import { ChangeEvent, useState } from 'react';
import { TransactionsStore } from '../stores/transactions-store';
import { ProfileStore } from '../../profile/stores/profile-store';
import { TransactionsApi } from '../api/transactions';
import { ProfileApi } from '../../profile/api/profile-api';

export const useTransactionForm = () => {
  const transactionsApi = Container.get(TransactionsApi);
  const profileApi = Container.get(ProfileApi);

  const transactionsStore = Container.get(TransactionsStore);
  const profileStore = Container.get(ProfileStore);

  const [transactionStatus, setTransactionStatus] = useState<{
    isCompleted: boolean
    isError: boolean
  }>({
    isCompleted: false,
    isError: false,
  });
  const [suggestions, setSuggestions] = useState<{ id: number, nickname: string }[]>([]);

  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
    errors,
  } = useFormik({
    initialValues: {
      recipient: {
        id: 0,
        value: '',
      },
      amount: '',
      recipientType: 'nickname',
    },
    enableReinitialize: true,
    validate: (validateValues) => {
      const validateErrors: Record<string, string> = {};

      if (validateValues.recipientType === 'operationNumber' && (typeof validateValues.recipient !== 'string'
       || !validateValues.recipient)) {
        validateErrors.recipient = 'Введите номер счета получателя';
      }

      if (validateValues.recipientType === 'nickname' && !validateValues.recipient?.id) {
        validateErrors.recipient = 'Необходимо выбрать пользователя из списка предложенных';
      }

      if (!validateValues.amount) {
        validateErrors.amount = 'Введите сумму перевода';
      }

      if ((profileStore.details?.amount || 0) < parseFloat(validateValues.amount)) {
        validateErrors.amount = 'Недостаточно средств на балансе';
      }

      return validateErrors;
    },
    onSubmit: async (formValues) => {
      if (
        profileStore.details?.id
      ) {
        let recipientId = formValues.recipientType === 'nickname' ? formValues.recipient.id : 0;

        if (formValues.recipientType === 'operationNumber') {
          const transactionResponse = await profileApi.findByNumber({
            number: formValues.recipient.toString(),
          });

          if (transactionResponse.data) {
            recipientId = transactionResponse.data.id;
          }
        }

        await transactionsStore.provideTransaction({
          senderId: profileStore.details?.id,
          recipientId: recipientId as number,
          cost: parseFloat(formValues.amount),
        });

        setTransactionStatus(() => ({
          isCompleted: true,
          isError: transactionsStore.isError,
        }));

        await Promise.all([
          profileStore.getProfileDetails(),
          transactionsStore.getTransactionsList(),
        ]);
      }
    },
  });

  const handleRecipientChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length >= 2) {
      const suggestionsResponse = await transactionsApi.getUsersSuggestions({
        q: value,
      });

      if (suggestionsResponse.data) {
        setSuggestions(suggestionsResponse.data || []);
      }
    }

    if (value.length < 2) {
      setSuggestions([]);
    }

    setFieldValue('recipient', value);
  };

  const onSuggestionsPick = (item: {id: number, value: string}) => {
    setFieldValue('recipient', item);
    setSuggestions([]);
  };

  const onSuggestionsClose = () => {
    const foundItem = suggestions.find((s) => s.nickname === values.recipient.value);
    if (!foundItem) {
      setFieldValue('recipient', {
        id: 0,
        value: '',
      });
    }
  };

  const onRecipientTypeChange = (type: string | null) => {
    setFieldValue('recipientType', type ?? 'recipient');
  };

  const clearData = () => {
    resetForm();
    setTransactionStatus({
      isError: false,
      isCompleted: false,
    });
  };

  return {
    values,
    isLoading: transactionsStore.isLoading,
    handleSubmit,
    handleChange,
    handleRecipientChange,
    suggestions,
    onSuggestionsPick,
    onSuggestionsClose,
    onRecipientTypeChange,
    transactionStatus,
    clearData,
    errors,
  };
};
