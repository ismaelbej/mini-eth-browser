export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Mini Ethereum Browser API',
    description: 'A RESTful API for exploring Ethereum blockchain data including blocks, transactions, accounts, and contracts.',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Development server'
    }
  ],
  tags: [
    {
      name: 'Blockchain',
      description: 'General blockchain information'
    },
    {
      name: 'Blocks',
      description: 'Block-related operations'
    },
    {
      name: 'Transactions',
      description: 'Transaction-related operations'
    },
    {
      name: 'Accounts',
      description: 'Account and address information'
    },
    {
      name: 'Contracts',
      description: 'Smart contract operations'
    }
  ],
  paths: {
    '/blockchain': {
      get: {
        tags: ['Blockchain'],
        summary: 'Get blockchain information',
        description: 'Retrieves current blockchain state including block number, gas price, and chain ID',
        responses: {
          '200': {
            description: 'Blockchain information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    blockchain: {
                      type: 'object',
                      properties: {
                        blockNumber: {
                          type: 'integer',
                          description: 'Current block number',
                          example: 12345678
                        },
                        gasPrice: {
                          type: 'string',
                          description: 'Current gas price in wei',
                          example: '20000000000'
                        },
                        chainId: {
                          type: 'integer',
                          description: 'Ethereum chain ID',
                          example: 1
                        }
                      },
                      required: ['blockNumber', 'gasPrice', 'chainId']
                    }
                  }
                },
                example: {
                  blockchain: {
                    blockNumber: 12345678,
                    gasPrice: '20000000000',
                    chainId: 1
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/block': {
      get: {
        tags: ['Blocks'],
        summary: 'Get list of blocks',
        description: 'Retrieves a list of blocks with optional pagination parameters',
        parameters: [
          {
            name: 'start',
            in: 'query',
            description: 'Starting block number (optional, defaults to latest blocks)',
            required: false,
            schema: {
              type: 'integer',
              minimum: 0
            },
            example: 12345670
          },
          {
            name: 'count',
            in: 'query',
            description: 'Number of blocks to retrieve (optional, defaults to 25)',
            required: false,
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 100
            },
            example: 25
          }
        ],
        responses: {
          '200': {
            description: 'List of blocks retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    blocks: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          number: {
                            type: 'integer',
                            description: 'Block number'
                          },
                          hash: {
                            type: 'string',
                            description: 'Block hash'
                          },
                          parentHash: {
                            type: 'string',
                            description: 'Parent block hash'
                          },
                          timestamp: {
                            type: 'integer',
                            description: 'Block timestamp'
                          },
                          transactions: {
                            type: 'array',
                            description: 'Transaction hashes in the block'
                          },
                          gasLimit: {
                            type: 'string',
                            description: 'Gas limit'
                          },
                          gasUsed: {
                            type: 'string',
                            description: 'Gas used'
                          },
                          miner: {
                            type: 'string',
                            description: 'Miner address'
                          },
                          difficulty: {
                            type: 'string',
                            description: 'Block difficulty'
                          },
                          totalDifficulty: {
                            type: 'string',
                            description: 'Total difficulty'
                          },
                          size: {
                            type: 'integer',
                            description: 'Block size in bytes'
                          },
                          extraData: {
                            type: 'string',
                            description: 'Extra data'
                          },
                          nonce: {
                            type: 'string',
                            description: 'Block nonce'
                          }
                        }
                      }
                    }
                  }
                },
                example: {
                  blocks: [
                    {
                      number: 12345678,
                      hash: '0x1234567890abcdef...',
                      parentHash: '0xabcdef1234567890...',
                      timestamp: 1640995200,
                      transactions: ['0xtx1...', '0xtx2...'],
                      gasLimit: '30000000',
                      gasUsed: '15000000',
                      miner: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
                      difficulty: '1000000',
                      totalDifficulty: '1000000000000',
                      size: 2048,
                      extraData: '0x',
                      nonce: '0x0000000000000000'
                    }
                  ]
                }
              }
            }
          },
          '400': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/block/{hash}': {
      get: {
        tags: ['Blocks'],
        summary: 'Get block by hash',
        description: 'Retrieves detailed information about a specific block by its hash',
        parameters: [
          {
            name: 'hash',
            in: 'path',
            description: 'Block hash',
            required: true,
            schema: {
              type: 'string',
              pattern: '^0x[a-fA-F0-9]{64}$'
            },
            example: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
          }
        ],
        responses: {
          '200': {
            description: 'Block information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    block: {
                      type: 'object',
                      properties: {
                        number: {
                          type: 'integer',
                          description: 'Block number'
                        },
                        hash: {
                          type: 'string',
                          description: 'Block hash'
                        },
                        parentHash: {
                          type: 'string',
                          description: 'Parent block hash'
                        },
                        timestamp: {
                          type: 'integer',
                          description: 'Block timestamp'
                        },
                        transactions: {
                          type: 'array',
                          description: 'Transaction hashes in the block'
                        },
                        gasLimit: {
                          type: 'string',
                          description: 'Gas limit'
                        },
                        gasUsed: {
                          type: 'string',
                          description: 'Gas used'
                        },
                        miner: {
                          type: 'string',
                          description: 'Miner address'
                        },
                        difficulty: {
                          type: 'string',
                          description: 'Block difficulty'
                        },
                        totalDifficulty: {
                          type: 'string',
                          description: 'Total difficulty'
                        },
                        size: {
                          type: 'integer',
                          description: 'Block size in bytes'
                        },
                        extraData: {
                          type: 'string',
                          description: 'Extra data'
                        },
                        nonce: {
                          type: 'string',
                          description: 'Block nonce'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Block not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/block/{hash}/txs': {
      get: {
        tags: ['Blocks'],
        summary: 'Get block transactions',
        description: 'Retrieves transactions from a specific block with optional pagination',
        parameters: [
          {
            name: 'hash',
            in: 'path',
            description: 'Block hash',
            required: true,
            schema: {
              type: 'string',
              pattern: '^0x[a-fA-F0-9]{64}$'
            },
            example: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
          },
          {
            name: 'start',
            in: 'query',
            description: 'Starting transaction index (optional, defaults to 0)',
            required: false,
            schema: {
              type: 'integer',
              minimum: 0
            },
            example: 0
          },
          {
            name: 'count',
            in: 'query',
            description: 'Number of transactions to retrieve (optional, defaults to 25)',
            required: false,
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 100
            },
            example: 25
          }
        ],
        responses: {
          '200': {
            description: 'Block transactions retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    txs: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          hash: {
                            type: 'string',
                            description: 'Transaction hash'
                          },
                          from: {
                            type: 'string',
                            description: 'Sender address'
                          },
                          to: {
                            type: 'string',
                            description: 'Recipient address'
                          },
                          value: {
                            type: 'string',
                            description: 'Transaction value in wei'
                          },
                          gas: {
                            type: 'string',
                            description: 'Gas limit'
                          },
                          gasPrice: {
                            type: 'string',
                            description: 'Gas price in wei'
                          },
                          nonce: {
                            type: 'integer',
                            description: 'Transaction nonce'
                          },
                          input: {
                            type: 'string',
                            description: 'Transaction input data'
                          },
                          blockNumber: {
                            type: 'integer',
                            description: 'Block number'
                          },
                          transactionIndex: {
                            type: 'integer',
                            description: 'Transaction index in block'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Block not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/tx/{txid}': {
      get: {
        tags: ['Transactions'],
        summary: 'Get transaction by hash',
        description: 'Retrieves detailed information about a specific transaction by its hash',
        parameters: [
          {
            name: 'txid',
            in: 'path',
            description: 'Transaction hash',
            required: true,
            schema: {
              type: 'string',
              pattern: '^0x[a-fA-F0-9]{64}$'
            },
            example: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
          }
        ],
        responses: {
          '200': {
            description: 'Transaction information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    tx: {
                      type: 'object',
                      properties: {
                        hash: {
                          type: 'string',
                          description: 'Transaction hash'
                        },
                        from: {
                          type: 'string',
                          description: 'Sender address'
                        },
                        to: {
                          type: 'string',
                          description: 'Recipient address'
                        },
                        value: {
                          type: 'string',
                          description: 'Transaction value in wei'
                        },
                        gas: {
                          type: 'string',
                          description: 'Gas limit'
                        },
                        gasPrice: {
                          type: 'string',
                          description: 'Gas price in wei'
                        },
                        nonce: {
                          type: 'integer',
                          description: 'Transaction nonce'
                        },
                        input: {
                          type: 'string',
                          description: 'Transaction input data'
                        },
                        blockNumber: {
                          type: 'integer',
                          description: 'Block number'
                        },
                        transactionIndex: {
                          type: 'integer',
                          description: 'Transaction index in block'
                        },
                        receipt: {
                          type: 'object',
                          properties: {
                            gasUsed: {
                              type: 'string',
                              description: 'Gas used by transaction'
                            },
                            status: {
                              type: 'integer',
                              description: 'Transaction status (1 = success, 0 = failed)'
                            },
                            contractAddress: {
                              type: 'string',
                              description: 'Contract address if transaction created a contract'
                            },
                            logs: {
                              type: 'array',
                              description: 'Transaction logs'
                            }
                          }
                        },
                        inputDecoded: {
                          type: 'object',
                          description: 'Decoded input data (if available)',
                          properties: {
                            name: {
                              type: 'string',
                              description: 'Function name'
                            },
                            params: {
                              type: 'array',
                              description: 'Function parameters'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Transaction not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/account/{address}': {
      get: {
        tags: ['Accounts'],
        summary: 'Get account information',
        description: 'Retrieves detailed information about an Ethereum account/address',
        parameters: [
          {
            name: 'address',
            in: 'path',
            description: 'Ethereum address',
            required: true,
            schema: {
              type: 'string',
              pattern: '^0x[a-fA-F0-9]{40}$'
            },
            example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
          }
        ],
        responses: {
          '200': {
            description: 'Account information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    account: {
                      type: 'object',
                      properties: {
                        address: {
                          type: 'string',
                          description: 'Account address'
                        },
                        balance: {
                          type: 'string',
                          description: 'Account balance in wei'
                        },
                        nonce: {
                          type: 'integer',
                          description: 'Account nonce'
                        },
                        code: {
                          type: 'string',
                          description: 'Contract code (if account is a contract)'
                        },
                        isContract: {
                          type: 'boolean',
                          description: 'Whether the account is a contract'
                        }
                      }
                    }
                  }
                },
                example: {
                  account: {
                    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
                    balance: '1000000000000000000',
                    nonce: 5,
                    code: '0x',
                    isContract: false
                  }
                }
              }
            }
          },
          '400': {
            description: 'Invalid address format',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/contract/{address}': {
      get: {
        tags: ['Contracts'],
        summary: 'Get contract information',
        description: 'Retrieves basic information about a smart contract',
        parameters: [
          {
            name: 'address',
            in: 'path',
            description: 'Contract address',
            required: true,
            schema: {
              type: 'string',
              pattern: '^0x[a-fA-F0-9]{40}$'
            },
            example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
          }
        ],
        responses: {
          '200': {
            description: 'Contract information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    contract: {
                      type: 'object',
                      properties: {
                        address: {
                          type: 'string',
                          description: 'Contract address'
                        }
                      }
                    }
                  }
                },
                example: {
                  contract: {
                    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
                  }
                }
              }
            }
          },
          '404': {
            description: 'Contract not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Error: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Array of error messages'
          }
        },
        required: ['errors']
      },
      Block: {
        type: 'object',
        properties: {
          number: {
            type: 'integer',
            description: 'Block number'
          },
          hash: {
            type: 'string',
            description: 'Block hash'
          },
          parentHash: {
            type: 'string',
            description: 'Parent block hash'
          },
          timestamp: {
            type: 'integer',
            description: 'Block timestamp'
          },
          transactions: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Transaction hashes in the block'
          },
          gasLimit: {
            type: 'string',
            description: 'Gas limit'
          },
          gasUsed: {
            type: 'string',
            description: 'Gas used'
          },
          miner: {
            type: 'string',
            description: 'Miner address'
          },
          difficulty: {
            type: 'string',
            description: 'Block difficulty'
          },
          totalDifficulty: {
            type: 'string',
            description: 'Total difficulty'
          },
          size: {
            type: 'integer',
            description: 'Block size in bytes'
          },
          extraData: {
            type: 'string',
            description: 'Extra data'
          },
          nonce: {
            type: 'string',
            description: 'Block nonce'
          }
        }
      },
      Transaction: {
        type: 'object',
        properties: {
          hash: {
            type: 'string',
            description: 'Transaction hash'
          },
          from: {
            type: 'string',
            description: 'Sender address'
          },
          to: {
            type: 'string',
            description: 'Recipient address'
          },
          value: {
            type: 'string',
            description: 'Transaction value in wei'
          },
          gas: {
            type: 'string',
            description: 'Gas limit'
          },
          gasPrice: {
            type: 'string',
            description: 'Gas price in wei'
          },
          nonce: {
            type: 'integer',
            description: 'Transaction nonce'
          },
          input: {
            type: 'string',
            description: 'Transaction input data'
          },
          blockNumber: {
            type: 'integer',
            description: 'Block number'
          },
          transactionIndex: {
            type: 'integer',
            description: 'Transaction index in block'
          }
        }
      },
      Account: {
        type: 'object',
        properties: {
          address: {
            type: 'string',
            description: 'Account address'
          },
          balance: {
            type: 'string',
            description: 'Account balance in wei'
          },
          nonce: {
            type: 'integer',
            description: 'Account nonce'
          },
          code: {
            type: 'string',
            description: 'Contract code (if account is a contract)'
          },
          isContract: {
            type: 'boolean',
            description: 'Whether the account is a contract'
          }
        }
      }
    }
  }
}; 