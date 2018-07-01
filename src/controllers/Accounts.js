import Ethereum from '../lib/ethereum';

export async function getAccountInfo(address) {
  const [balance, transactionCount, code] = await Promise.all([
    Ethereum.getBalance(address),
    Ethereum.getTransactionCount(address),
    Ethereum.getCode(address),
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
