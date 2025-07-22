import dotenv from 'dotenv';

dotenv.config();

export const config = {
  recall: {
    apiKey: process.env.RECALL_API_KEY || '',
    networkUrl: process.env.RECALL_NETWORK_URL || 'https://api.sandbox.competitions.recall.network',
  },
  wallet: {
    privateKey: process.env.PRIVATE_KEY || '',
    address: process.env.WALLET_ADDRESS || '',
  },
  trading: {
    maxSlippage: parseFloat(process.env.MAX_SLIPPAGE || '0.5'),
    gasLimit: parseInt(process.env.GAS_LIMIT || '300000'),
        minProfitThreshold: parseFloat(process.env.MIN_PROFIT_THRESHOLD || '0.02'),
  },
  mastra: {
    apiKey: process.env.MASTRA_API_KEY || '',
  },
};

export interface TradingStrategy {
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  maxPositionSize: number;
  stopLoss: number;
  takeProfit: number;
}

export const tradingStrategies: TradingStrategy[] = [
  {
    name: 'conservative',
    riskLevel: 'low',
    maxPositionSize: 0.1,
    stopLoss: 0.05,
    takeProfit: 0.1,
  },
  {
    name: 'balanced',
    riskLevel: 'medium',
    maxPositionSize: 0.25,
    stopLoss: 0.1,
    takeProfit: 0.2,
  },
  {
    name: 'aggressive',
    riskLevel: 'high',
    maxPositionSize: 0.5,
    stopLoss: 0.15,
    takeProfit: 0.3,
  },
];
