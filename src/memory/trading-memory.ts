import { RecallMemory } from '../services/recall-service';
import { TradingSignal, TechnicalIndicators } from '../tools/trading-tools';

export interface TradingMemoryEntry {
  timestamp: Date;
  symbol: string;
  action: string;
  signal?: TradingSignal;
  indicators?: TechnicalIndicators;
  result?: {
    executed: boolean;
    price?: number;
    amount?: number;
    profit?: number;
  };
  notes?: string;
}

export class TradingMemory {
  private memory: RecallMemory;

  constructor() {
    this.memory = new RecallMemory();
  }

  // Store trading decision
  async storeTradingDecision(entry: TradingMemoryEntry): Promise<void> {
    const memoryData = {
      type: 'trading_decision',
      timestamp: entry.timestamp.toISOString(),
      symbol: entry.symbol,
      action: entry.action,
      signal: entry.signal,
      indicators: entry.indicators,
      result: entry.result,
      notes: entry.notes,
    };

    await this.memory.store(`trading_${entry.symbol}_${Date.now()}`, memoryData);
  }

  // Retrieve trading history for a symbol
  async getTradingHistory(symbol: string, limit: number = 10): Promise<TradingMemoryEntry[]> {
    const memories = await this.memory.search({
      query: `trading decisions for ${symbol}`,
      filters: { type: 'trading_decision', symbol },
      limit,
    });

    return memories.map(memory => ({
      timestamp: new Date(memory.data.timestamp),
      symbol: memory.data.symbol,
      action: memory.data.action,
      signal: memory.data.signal,
      indicators: memory.data.indicators,
      result: memory.data.result,
      notes: memory.data.notes,
    }));
  }

  // Get performance analytics
  async getPerformanceAnalytics(symbol?: string): Promise<any> {
    const filters: any = { type: 'trading_decision' };
    if (symbol) filters.symbol = symbol;

    const memories = await this.memory.search({
      query: 'trading performance analytics',
      filters,
      limit: 100,
    });

    const trades = memories.filter(m => m.data.result?.executed);
    const totalTrades = trades.length;
    const profitableTrades = trades.filter(t => (t.data.result?.profit || 0) > 0).length;
    const totalProfit = trades.reduce((sum, t) => sum + (t.data.result?.profit || 0), 0);

    return {
      totalTrades,
      profitableTrades,
      winRate: totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0,
      totalProfit,
      averageProfit: totalTrades > 0 ? totalProfit / totalTrades : 0,
    };
  }

  // Store market insights
  async storeMarketInsight(symbol: string, insight: string, confidence: number): Promise<void> {
    const memoryData = {
      type: 'market_insight',
      timestamp: new Date().toISOString(),
      symbol,
      insight,
      confidence,
    };

    await this.memory.store(`insight_${symbol}_${Date.now()}`, memoryData);
  }

  // Get relevant market insights
  async getMarketInsights(symbol: string, limit: number = 5): Promise<any[]> {
    const memories = await this.memory.search({
      query: `market insights for ${symbol}`,
      filters: { type: 'market_insight', symbol },
      limit,
    });

    return memories.map(memory => ({
      timestamp: new Date(memory.data.timestamp),
      insight: memory.data.insight,
      confidence: memory.data.confidence,
    }));
  }
}

export const tradingMemory = new TradingMemory();
