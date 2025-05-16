import { config } from './src/config/app';
import { logger } from './src/utils/logger';
import { createUser, getAllUsers } from './src/services/userService';

const startServer = () => {
  logger.info('Starting server in %s mode...', config.nodeEnv);
  
  // Example usage
  createUser({ name: 'John Doe', email: 'john@example.com' });
  createUser({ name: 'Jane Smith', email: 'jane@example.com' });
  
  const users = getAllUsers();
  logger.info('Current users: %j', users);
  
  logger.info('Server ready on port %d', config.port);
};

startServer();