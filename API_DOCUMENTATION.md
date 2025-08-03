# Mini Ethereum Browser API Documentation

## Overview

The Mini Ethereum Browser API provides a RESTful interface for exploring Ethereum blockchain data including blocks, transactions, accounts, and contracts.

## API Documentation

### Swagger UI

The API documentation is available through Swagger UI at:

**URL**: `http://localhost:5000/api-docs`

When the application is running, you can access the interactive API documentation by visiting this URL in your browser.

### API Base URL

All API endpoints are prefixed with `/api/v1`:

**Base URL**: `http://localhost:5000/api/v1`

## Available Endpoints

### Blockchain Information
- `GET /api/v1/blockchain` - Get current blockchain state (block number, gas price, chain ID)

### Blocks
- `GET /api/v1/block` - Get list of blocks with pagination
- `GET /api/v1/block/{hash}` - Get specific block by hash
- `GET /api/v1/block/{hash}/txs` - Get transactions from a specific block

### Transactions
- `GET /api/v1/tx/{txid}` - Get transaction details by hash

### Accounts
- `GET /api/v1/account/{address}` - Get account information by address

### Contracts
- `GET /api/v1/contract/{address}` - Get contract information by address

## Getting Started

1. **Start the application**:
   ```bash
   docker-compose up
   ```

2. **Access the API documentation**:
   - Open your browser and navigate to `http://localhost:5000/api-docs`
   - The Swagger UI will display all available endpoints with detailed documentation

3. **Test the API**:
   - Use the "Try it out" button in Swagger UI to test endpoints directly
   - All endpoints include example requests and responses

## API Features

### Pagination
Many endpoints support pagination through query parameters:
- `start` - Starting index (optional)
- `count` - Number of items to retrieve (optional, defaults vary by endpoint)

### Error Handling
All endpoints return consistent error responses:
```json
{
  "errors": ["Error message"]
}
```

### Response Format
Successful responses follow this pattern:
```json
{
  "data": {
    // Response data
  }
}
```

## Development

### Running Locally
```bash
# Start the backend
docker-compose up app

# Start the frontend
docker-compose up web
```

### Testing
```bash
# Run API tests
docker-compose exec app npm test
```

## Configuration

The API can be configured through environment variables:

- `API_PORT` - Port for the API server (default: 5000)
- `RPC_NODE` - Ethereum RPC endpoint (default: http://localhost:8545)

## Examples

### Get Blockchain Information
```bash
curl http://localhost:5000/api/v1/blockchain
```

### Get Latest Blocks
```bash
curl "http://localhost:5000/api/v1/block?count=10"
```

### Get Account Information
```bash
curl http://localhost:5000/api/v1/account/0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
```

## Notes

- The API requires a running Ethereum node or RPC endpoint
- All blockchain data is fetched in real-time from the connected Ethereum node
- The API supports both mainnet and testnet configurations
- Response times may vary depending on the connected Ethereum node's performance 