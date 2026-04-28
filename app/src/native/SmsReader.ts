import { NativeModules } from 'react-native';
import type { SmsEnvelope } from '@mind-sync/shared';

const { SmsReader } = NativeModules as {
  SmsReader: {
    read(afterId: string, limit: number): Promise<SmsEnvelope[]>;
  };
};

export const SmsReaderModule = {
  read(afterId: string = '', limit: number = 200): Promise<SmsEnvelope[]> {
    return SmsReader.read(afterId, limit);
  },
};
