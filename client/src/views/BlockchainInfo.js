import React from 'react';
import {
  Button,
  Container,
  Label,
} from 'semantic-ui-react';
import Blockchain from '../components/BlockchainInfo';
import {
  getBlockchainInfo,
} from '../lib/api';
import {
  formatTimestamp,
  formatAmount,
} from '../utils/formatters';

class BlockchainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    try {
      this.setState({ loading: true, error: false });
      const { blockchain } = await getBlockchainInfo();
      const data = {
        blockchain,
      };
      this.setState({ loading: false, error: false, data });
    } catch (ex) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const {
      loading,
      data: {
        blockchain,
      } = {
        blockchain: {
          block: {
            number: 0,
            timestamp: 0,
          },
          gasPrice: 0,
        },
      },
    } = this.state;
    return (
      <Blockchain blockchain={blockchain} />
    );
  }
}

export default BlockchainInfo;
