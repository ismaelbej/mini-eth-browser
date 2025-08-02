export interface BlockchainData {
  blockchain: {
    block: {
      number: number;
      hash: string;
      timestamp: number;
    };
    gasPrice: string;
    blockNumber: number;
  };
}

export interface Block {
  number: number;
  hash: string;
  timestamp: number;
  transactions: number;
  gasUsed: string;
  gasLimit: string;
  miner: string;
}

export interface BlockListData {
  blocks: Block[];
}

export interface Transaction {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  nonce: number;
  input: string;
}

export interface Account {
  address: string;
  balance: string;
  nonce: number;
  code: string;
}

export interface ApiError {
  message: string;
  status?: number;
} 