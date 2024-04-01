const getAccountInfo = ({
  getBalance,
  getTransactionCount,
  getCode,
}) => async (address) => {
  const [
    balance,
    transactionCount,
    code,
  ] = await Promise.all([
    getBalance(address),
    getTransactionCount(address),
    getCode(address),
  ]);

  return {
    address,
    balance,
    transactionCount,
    isContract: typeof code !== 'undefined' && code !== '0x',
  };
}

export default (web3) => ({
  getAccountInfo: getAccountInfo(web3),
});
