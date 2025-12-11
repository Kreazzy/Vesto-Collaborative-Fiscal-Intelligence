
import { CURRENCY_SYMBOLS } from '../constants';
import { CurrencyCode } from '../types';

export const formatCurrency = (amount: number, code: CurrencyCode = 'USD'): string => {
  const symbol = CURRENCY_SYMBOLS[code] || '$';
  return `${symbol}${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const getCurrencySymbol = (code: CurrencyCode): string => {
  return CURRENCY_SYMBOLS[code] || '$';
};
