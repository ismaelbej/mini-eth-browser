import React from 'react';
import { formatAmount } from '../utils/formatters';

const Account = (props) => {
  const { account } = props;
  return (
    <table className="u-full-width">
      <tbody>
        <tr>
          <td>Address:</td>
          <td>{account.address}</td>
        </tr>
        <tr>
          <td>Balance:</td>
          <td>{formatAmount(account.balance)}</td>
        </tr>
        <tr>
          <td>Num. Transactions:</td>
          <td>{account.transactionCount}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Account;
