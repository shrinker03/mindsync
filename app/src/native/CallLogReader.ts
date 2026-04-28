import { NativeModules } from 'react-native';
import type { CallEnvelope } from '@mind-sync/shared';

const { CallLogReader } = NativeModules as {
  CallLogReader: {
    read(afterId: string, limit: number): Promise<CallEnvelope[]>;
  };
};

export const CallLogReaderModule = {
  read(afterId: string = '', limit: number = 200): Promise<CallEnvelope[]> {
    return CallLogReader.read(afterId, limit);
  },
};
