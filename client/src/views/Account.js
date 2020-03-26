import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import AccountComponent from '../components/Account';
import {
  getAccountInfo,
} from '../lib/api';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { address } = this.props.match.params;
    this.loadData(address);
  }

  componentDidUpdate(prevProps) {
    const { address: prevAddress } = prevProps.match.params;
    const { address } = this.props.match.params;
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
      } = {},
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
            <AccountComponent account={account} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Account;
