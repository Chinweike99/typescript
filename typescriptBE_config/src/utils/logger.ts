import { format } from 'node:util';

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(format(message, ...args));
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(format(message, ...args));
  }
};