import React from 'react';
import Blockchain from '../components/BlockchainInfo';
import {
  getBlockchainInfo,
  subscribe,
} from '../lib/api';


class BlockchainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        blockchain: {
          block: {
            number: 0,
            timestamp: 0,
          },
          gasPrice: 0,
        }
      }
    };
  }

  componentDidMount() {
    this.loadData();
    subscribe('newBlock', () => {
      this.loadData();
    });
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
      },
    } = this.state;
    return (
      <Blockchain blockchain={blockchain} />
    );
  }
}

export default BlockchainInfo;
