export type SmsEnvelope = {
  id: string;
  address: string;
  body: string;
  date: number;
  type: number;
  threadId: string;
  read: number;
};

export type CallEnvelope = {
  id: string;
  number: string;
  duration: number;
  date: number;
  type: number;
  name: string | null;
};

export type NotificationEnvelope = {
  pkg: string;
  title: string | null;
  text: string | null;
  timestamp: number;
};
