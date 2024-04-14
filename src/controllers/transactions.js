function formatTransaction(transaction, receipt, code) {
  if (!transaction) {
    return {};
  }
  return {
    ...transaction,
    receipt: receipt
      ? {
        ...receipt,
      }
      : undefined,
    code: typeof code !== 'undefined' ? true : false,
  };
}

const getTransactionInfo = ({
  getTransaction,
  getTransactionReceipt,
  getCode,
}) => async (txid, block) => {
  const [tx, receipt] = await Promise.all([
    getTransaction(txid),
    getTransactionReceipt(txid),
  ]);
  const code = tx && tx.to ? await getCode(tx.to) : undefined;
  return formatTransaction(tx, receipt, code);
}

const listBlockTransactions = ({ getBlock, getTransactionInfo }) => async (hash, start, count) => {  
  const block = await getBlock(hash);

  if (typeof start == 'undefined') {
    start = 0;
  }

  if (typeof count == 'undefined') {
    count = block.transactions.length - start;
  }

  const txids = block.transactions.slice(start, start + count - 1);
  const txs = await Promise.all(
    txids.map(getTransactionInfo)
  );
  return txs;
}

export default (web3) => {
  const { getBlock } = web3;
  return {
    getTransactionInfo: getTransactionInfo(web3),
    listBlockTransactions: listBlockTransactions({
      getBlock,
      getTransactionInfo: getTransactionInfo(web3),
    }),
  };
}
