import { ChangeEvent, useState } from 'react';

export const useShownPasswordHook = (defaultValue = false) => {
  const [isShownPassword, setIsShownPassword] = useState(defaultValue);

  const onShownChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setIsShownPassword(e.target.checked);
  };

  return {
    isShownPassword,
    setIsShownPassword,
    passwordType: isShownPassword ? 'text' : 'password',
    onShownChangeCallback,
  };
};
