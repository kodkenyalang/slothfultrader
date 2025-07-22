import { SlothfulTrader } from './agent';
import { config } from './config';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'slothfultrader.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Create and start the SlothfulTrader agent
async function startSlothfulTrader() {
  logger.info('Starting SlothfulTrader...');
  
  try {
    const trader = new SlothfulTrader();
    await trader.start();
    
    // Handle process termination
    process.on('SIGINT', async () => {
      logger.info('Received SIGINT, shutting down...');
      await trader.stop();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM, shutting down...');
      await trader.stop();
      process.exit(0);
    });
    
    logger.info('SlothfulTrader is running');
  } catch (error) {
    logger.error('Failed to start SlothfulTrader:', error);
    process.exit(1);
  }
}

// Start the agent
startSlothfulTrader();
