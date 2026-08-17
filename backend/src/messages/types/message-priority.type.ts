export const MESSAGE_PRIORITIES = ['URGENT', 'HIGH', 'NORMAL', 'LOW'] as const;

export type MessagePriorityValue = (typeof MESSAGE_PRIORITIES)[number];
