import dayjs from 'dayjs';

export const formatTransactionTime = (time: string) => dayjs(time).format('DD.MM.YY HH:mm');
