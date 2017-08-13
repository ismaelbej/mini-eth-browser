import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import queryString from 'query-string';
import TransactionInfoView from '../components/TransactionInfoView';
import TransactionListView from '../components/TransactionListView';

const TransactionListQuery = (props) => {
  const { block, start, count } = queryString.parse(props.location.search);
  return (
    <div>
      <TransactionListView block={block} start={start} count={count} />
    </div>
  );
};

const TransactionInfoQuery = (props) => {
  const { txid } = props.match.params;
  return (
    <div>
      <TransactionInfoView txid={txid} />
    </div>
  );
};

const TransactionView = () => (
  <div>
    <div className="row">
      <h1>Transaction</h1>
    </div>
    <div className="row">
      <Switch>
        <Route path="/tx/:txid" component={TransactionInfoQuery} />
      </Switch>
    </div>
  </div>
);

export default TransactionView;
