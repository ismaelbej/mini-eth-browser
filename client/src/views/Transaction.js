import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import TransactionInfoView from '../components/TransactionInfoView';

class TransactionListView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      txs: null,
      start: -1,
      count: 25
    };
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

const TransactionInfoQuery = (props) => {
  const { txid } = props.match.params;
  return (
    <div>
      <TransactionInfoView txid={txid} />
    </div>
  );
}

const TransactionView = () => (
  <div>
    <div className="row">
      <h1>Transaction</h1>
    </div>
    <div className="row">
      <Switch>
        <Route exact path="/tx" component={TransactionListView} />
        <Route path="/tx/:txid" component={TransactionInfoQuery} />
      </Switch>
    </div>
  </div>
);


export default TransactionView;
