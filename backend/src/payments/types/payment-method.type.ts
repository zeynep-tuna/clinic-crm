export const PAYMENT_METHODS = ['CASH', 'CARD', 'BANK_TRANSFER'] as const;

export type PaymentMethodValue = (typeof PAYMENT_METHODS)[number];
