import axios from 'axios';
import { config } from '../config';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'recall-service.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export class RecallMemory {
  private apiClient: axios.AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: `${config.recall.networkUrl}/memory`,
      headers: {
        'Authorization': `Bearer ${config.recall.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Store a memory
  async store(key: string, data: any): Promise<void> {
    try {
      await this.apiClient.post('/store', {
        key,
        data,
        metadata: {
          agent: 'SlothfulTrader',
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      logger.error('Error storing memory:', error);
      throw new Error(`Failed to store memory: ${error}`);
    }
  }

  // Retrieve a memory
  async retrieve(key: string): Promise<any> {
    try {
      const response = await this.apiClient.get(`/retrieve/${key}`);
      return response.data;
    } catch (error) {
      logger.error(`Error retrieving memory with key ${key}:`, error);
      throw new Error(`Failed to retrieve memory: ${error}`);
    }
  }

  // Search memories
  async search(params: { query: string; filters?: any; limit?: number }): Promise<any[]> {
    try {
      const response = await this.apiClient.post('/search', params);
      return response.data.results;
    } catch (error) {
      logger.error('Error searching memories:', error);
      throw new Error(`Failed to search memories: ${error}`);
    }
  }
}
