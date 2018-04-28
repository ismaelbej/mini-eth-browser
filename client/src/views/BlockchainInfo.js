import React from 'react';
import Blockchain from '../components/BlockchainInfo';
import {
  getBlockchainInfo,
} from '../lib/api';

const BLOCKCHAININFO_TIMEOUT = 10;

class BlockchainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshEvents = this.refreshEvents.bind(this);
  }

  componentDidMount() {
    this.loadData();
    setTimeout(this.refreshEvents, BLOCKCHAININFO_TIMEOUT * 1000);
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

  async refreshEvents() {
    this.loadData();
    setTimeout(this.refreshEvents, BLOCKCHAININFO_TIMEOUT * 1000);
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
