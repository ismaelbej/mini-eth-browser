import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import AccountComponent from '../components/Account';
import {
  getAccountInfo,
} from '../lib/api';


const AccountInfo = ({ account }) => (
  <AccountComponent
    address={account ? account.address : '0x'}
    balance={account ? account.balance : 0}
    transactionCount={account ? account.transactionCount : 0}
    isContract={account ? account.isContract : false}
  />
);


class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      data: {
        account: undefined,
      },
    };
  }

  componentDidMount() {
    const { match: { params: { address } } } = this.props;
    this.loadData(address);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { address: prevAddress } } } = prevProps;
    const { match: { params: { address } } } = this.props;
    if (prevAddress !== address) {
      this.loadData(address);
    }
  }

  async loadData(address) {
    try {
      this.setState({ loading: true, error: false });
      const { account } = await getAccountInfo(address);
      const data = { account };
      this.setState({ loading: false, error: false, data });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const {
      data: {
        account,
      },
    } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Account</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <AccountInfo account={account} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Account;
