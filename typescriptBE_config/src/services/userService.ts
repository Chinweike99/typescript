import { logger } from '../utils/logger';
import type { User, CreateUserInput } from '../types/user';

const users: User[] = [];

export const createUser = (input: CreateUserInput): User => {
  const newUser: User = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date()
  };
  users.push(newUser);
  logger.info('Created user with ID: %s', newUser.id);
  return newUser;
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getAllUsers = (): User[] => {
  return [...users];
};
