import { Agent } from '@mastra/core';
import { tradingTools } from './tools/trading-tools';
import { tradingMemory } from './memory/trading-memory';
import { config } from './config';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
    format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'agent.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export class SlothfulTrader {
  private agent: Agent;
  private isActive: boolean = false;
  private lastTradeTimestamp: number = 0;
  private tradingPairs: string[] = ['ETH/USDC', 'BTC/USDC', 'LINK/USDC'];
  private cooldownPeriod: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor() {
    this.agent = new Agent({
      name: 'SlothfulTrader',
      description: 'Autonomous DeFi trading agent that interacts with Recall Network',
      tools: [
        ...tradingTools.getTools(),
        // Add more tools as needed
      ],
      // Configure the LLM model
      model: {
        provider: 'openai',
        model: 'gpt-4',
        apiKey: config.mastra.apiKey,
      },
      memory: {
        type: 'structured',
        capacity: 50,
      },
    });

    logger.info('SlothfulTrader agent initialized');
  }

  // Start the trading agent
  public async start(): Promise<void> {
    if (this.isActive) {
      logger.warn('SlothfulTrader is already running');
      return;
    }

    this.isActive = true;
    logger.info('SlothfulTrader started');

    // Start the main trading loop
    this.tradingLoop();
  }

  // Stop the trading agent
  public async stop(): Promise<void> {
    this.isActive = false;
    logger.info('SlothfulTrader stopped');
  }

  // Main trading loop
  private async tradingLoop(): Promise<void> {
    while (this.isActive) {
      try {
        // Rotate through trading pairs
        for (const pair of this.tradingPairs) {
          if (!this.isActive) break;

          logger.info(`Analyzing trading pair: ${pair}`);
          await this.analyzeTradingPair(pair);
          
          // Wait to avoid rate limits
          await this.sleep(3000);
        }

        // Sleep before next cycle
        await this.sleep(60000);
      } catch (error) {
        logger.error('Error in trading loop:', error);
        await this.sleep(10000);
      }
    }
  }

  // Analyze a specific trading pair
  private async analyzeTradingPair(symbol: string): Promise<void> {
    try {
      const now = Date.now();
      
      // Check if we're still in cooldown period since last trade
      if (now - this.lastTradeTimestamp < this.cooldownPeriod) {
        logger.info(`Still in cooldown period for ${symbol}, skipping analysis`);
        return;
      }

      // Get market analysis
      const marketAnalysis = await this.agent.execute(`
        Analyze the current market conditions for ${symbol} and determine if there's a trading opportunity.
        Consider all available technical indicators and recent market movements.
        Only recommend a trade if there's strong confidence.
      `);

      // Store the analysis in memory
      await tradingMemory.storeMarketInsight(symbol, marketAnalysis.text, 0.7);

      // Check if the analysis suggests a trade
      if (marketAnalysis.text.toLowerCase().includes('buy') || marketAnalysis.text.toLowerCase().includes('sell')) {
        // Execute trading workflow
        await this.executeTradingDecision(symbol, marketAnalysis.text);
        this.lastTradeTimestamp = now;
      } else {
        logger.info(`No clear trading opportunity for ${symbol}`);
      }
    } catch (error) {
      logger.error(`Error analyzing ${symbol}:`, error);
    }
  }

  // Execute trading decision
  private async executeTradingDecision(symbol: string, analysis: string): Promise<void> {
    try {
      const action = analysis.toLowerCase().includes('buy') ? 'buy' : 'sell';
      
      logger.info(`Executing ${action} decision for ${symbol}`);
      
      const result = await this.agent.execute(`
        I want to ${action} ${symbol} based on this analysis: "${analysis}"
        
        1. How much should I ${action}?
        2. What's the best execution strategy?
        3. Where should I set stop loss and take profit?
        
        After answering these questions, execute the trade using the available tools.
      `);
      
      // Store the trading decision
      await tradingMemory.storeTradingDecision({
        timestamp: new Date(),
        symbol,
        action,
        notes: analysis,
        result: {
          executed: result.text.toLowerCase().includes('executed') || result.text.toLowerCase().includes('successful'),
        },
      });
      
      logger.info(`Trading decision execution completed for ${symbol}`);
    } catch (error) {
      logger.error(`Error executing trading decision for ${symbol}:`, error);
    }
  }

  // Helper method to sleep
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
    
