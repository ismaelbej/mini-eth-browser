import React, { createContext, useContext, useReducer } from 'react';

const BlockchainContext = createContext();

const initialState = {
  blockchain: null,
  loading: false,
  error: null,
  lastUpdate: null,
};

const blockchainReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_BLOCKCHAIN_DATA':
      return {
        ...state,
        blockchain: action.payload,
        loading: false,
        error: null,
        lastUpdate: new Date(),
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const BlockchainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blockchainReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setBlockchainData = (data) => {
    dispatch({ type: 'SET_BLOCKCHAIN_DATA', payload: data });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    setLoading,
    setBlockchainData,
    setError,
    clearError,
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchainContext = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchainContext must be used within a BlockchainProvider');
  }
  return context;
}; 