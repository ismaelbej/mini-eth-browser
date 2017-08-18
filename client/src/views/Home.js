import React from 'react';
import BlockList from '../components/BlockList';
import HomeController from '../controllers/Home';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: undefined,
      blocks: [],
    };
  }

  componentDidMount() {
    this.controller = new HomeController();
    this.controller.on('blockchain', blockchain => this.handleBlockchain(blockchain));
    this.controller.on('blocks', blocks => this.handleBlocks(blocks));
    this.controller.initialize();
  }

  handleBlockchain(blockchain) {
    if (blockchain) {
      this.setState({
        start: blockchain.blockNumber,
      });
    }
  }

  handleBlocks(blocks) {
    this.setState({
      blocks,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Home</h1>
        </div>
        <div className="row">
          <div className="six columns">
            <h3>Recent blocks</h3>
            {this.state.blocks && <BlockList blocks={this.state.blocks} />}
          </div>
          <div className="six columns" />
        </div>
      </div>
    );
  }
}

export default Home;
