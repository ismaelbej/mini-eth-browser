import React from 'react';
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
      <div>
        <div className="row">
          <h1>Account</h1>
        </div>
        <div className="row">
          {this.state.account && <AccountComponent account={this.state.account} />}
        </div>
      </div>
    );
  }
}

export default Account;
