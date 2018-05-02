import React from 'react';
import Blockchain from '../components/BlockchainInfo';
import AutoRefresh from '../components/AutoRefresh';
import {
  getBlockchainInfo,
} from '../lib/api';

const BLOCKCHAININFO_TIMEOUT = 10;

const BlockchainInfoView = AutoRefresh(Blockchain, BLOCKCHAININFO_TIMEOUT * 1000);

class BlockchainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshView = this.refreshView.bind(this);
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

  refreshView() {
    this.loadData();
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
      <BlockchainInfoView refreshView={this.refreshView} blockchain={blockchain} />
    );
  }
}

export default BlockchainInfo;
