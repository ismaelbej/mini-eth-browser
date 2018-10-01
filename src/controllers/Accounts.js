import { getBalance, getCode, getTransactionCount } from '../lib/ethereum';

export async function getAccountInfo(address) {
  const [balance, transactionCount, code] = await Promise.all([
    getBalance(address),
    getTransactionCount(address),
    getCode(address),
  ]);
  return {
    address,
    balance,
    transactionCount,
    code,
  };
}

export default {
  getAccountInfo,
};
