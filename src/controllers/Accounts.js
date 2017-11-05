import {
  getBalance,
  getCode,
  getTransactionCount,
} from '../lib/ethereum';

export async function getAccountInfo(address) {
  const [balance, transactionCount, code] = await Promise.all([
    getBalance(address),
    getTransactionCount(address),
    getCode(address),
  ]);
  const account = {
    address,
    balance,
    transactionCount,
  };
  if (code && code !== '0x' && code !== '0x0') {
    account.code = code;
  }
  return account;
}

export default {
  getAccountInfo,
};
