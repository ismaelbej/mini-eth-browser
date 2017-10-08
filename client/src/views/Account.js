import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import AccountController from '../controllers/Account';
import AccountComponent from '../components/Account';

class Account extends React.Component {
  constructor(props) {
    super(props);
    const { address } = props.match.params;
    this.state = {
      address,
      account: undefined,
    };
  }

  componentDidMount() {
    this.controller = new AccountController();
    this.controller.on('account', account => this.handleAccount(account));
    this.controller.initialize(this.state.address);
  }

  componentWillReceiveProps(nextProps) {
    const { address } = nextProps.match.params;
    if (address !== this.state.address) {
      this.setState({
        address,
        account: undefined,
      });
      this.controller.loadAccount(address);
    }
  }

  handleAccount({ account }) {
    this.setState({
      account,
    });
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Account</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {this.state.account && <AccountComponent account={this.state.account} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Account;
