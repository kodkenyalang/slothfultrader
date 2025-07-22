# SlothfulTrader



> An autonomous DeFi trading agent built with Mastra and Recall Network

SlothfulTrader is a sophisticated autonomous trading system that leverages AI decision-making via the Mastra framework combined with on-chain execution through the Recall Network. 
It's designed to perform market analysis, make deliberate trading decisions, and execute trades without constant human supervision.

## Features

- 🤖 **Fully Autonomous**: Set parameters and let the agent handle the rest
- 📊 **Advanced Market Analysis**: Utilizes technical indicators and market data
- 🧠 **AI-powered Decision Making**: Powered by Mastra's agent framework
- 💰 **Risk Management**: Configurable position sizing and stop-loss strategies
- 📝 **Comprehensive Memory**: Stores trading history and learns from past decisions
- ⚡ **DeFi Integration**: Direct integration with Recall Network for trade execution

## Architecture

SlothfulTrader follows a modular architecture:

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│    Trading    │       │  AI Decision  │       │    Recall     │
│    Analysis   │ ─────▶│    Engine     │ ─────▶│    Network    │
│               │       │               │       │  Integration  │
└───────────────┘       └───────────────┘       └───────────────┘
        ▲                       ▲                       ▲
        │                       │                       │
        └───────────────────────┴───────────────────────┘
                               │
                        ┌──────────────┐
                        │   Trading    │
                        │    Memory    │
                        └──────────────┘
```

## Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Recall Network API keys
- Mastra framework credentials

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/slothfultrader.git
cd slothfultrader
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

4. Build the project:
```bash
npm run build
```

## Configuration

Configure SlothfulTrader by editing your `.env` file:

```
# Mastra Configuration
MASTRA_API_KEY=your_mastra_api_key
MASTRA_MODEL=gpt-4

# Recall Network Configuration
RECALL_API_KEY=your_recall_api_key
RECALL_NETWORK_URL=https://api.recall.network
RECALL_WALLET_KEY=your_wallet_private_key

# Trading Configuration
RISK_PERCENTAGE=1.5
MAX_TRADE_SIZE_USD=1000
COOLDOWN_PERIOD_MINUTES=5

# Supported Trading Pairs
TRADING_PAIRS=ETH/USDC,BTC/USDC,LINK/USDC
```

## Usage

### Starting the agent

```bash
npm start
```

### Development mode

```bash
npm run dev
```

### Running tests

```bash
npm test
```

## Project Structure

```
slothfultrader/
├── src/
│   ├── agents/
│   │   └── slothfultrader.ts     # Main agent implementation
│   ├── tools/
│   │   ├── recall-tools.ts       # Recall Network integration tools
│   │   └── trading-tools.ts      # Trading analysis tools
│   ├── workflows/
│   │   └── trading-workflow.ts   # Trading decision workflow
│   ├── memory/
│   │   └── trading-memory.ts     # Memory management for trading history
│   ├── services/
│   │   └── recall-service.ts     # Recall Network service integration
│   ├── config/
│   │   └── index.ts              # Configuration management
│   └── index.ts                  # Application entry point
├── package.json
├── tsconfig.json
└── .env
```

## Missing Components

To complete the implementation, the following components need to be developed:

1. **Config Module** (src/config/index.ts):
```typescript
// Implementation for loading environment variables
```

2. **Recall Tools** (src/tools/recall-tools.ts):
```typescript
// Implementation for Recall Network integration tools
```

3. **Trading Tools** (src/tools/trading-tools.ts):
```typescript
// Implementation for trading analysis and execution tools
```

4. **Types Definition** (types.d.ts):
```typescript
// TypeScript type definitions for the project
```

5. **Environment Example** (.env.example):
```
# Example environment configuration file
```

## Dependencies

- [Mastra](https://mastra.ai/en/docs/) - AI agent framework
- [Recall Network](https://docs.recall.network/) - DeFi infrastructure
- [ethers.js](https://docs.ethers.io/) - Ethereum interactions
- [axios](https://axios-http.com/) - HTTP requests
- [winston](https://github.com/winstonjs/winston) - Logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

SlothfulTrader is experimental software and comes with no warranty. Use it at your own risk. The developers are not responsible for any financial losses incurred through the use of this software.

---

Built with ❤️ using [Mastra](https://mastra.ai) and [Recall Network](https://recall.network)
