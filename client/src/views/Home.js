import React from 'react';
import BlockListView from '../components/BlockListView';
import HomeController from '../controllers/Home';

const HOME_BLOCK_COUNT = 10;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: undefined,
    };
  }

  componentDidMount() {
    this.controller = new HomeController();
    this.controller.on('blockchain', blockchain => this.handleBlockchain(blockchain));
    this.controller.initialize();
  }

  handleBlockchain(blockchain) {
    if (blockchain) {
      this.setState({
        start: blockchain.blockNumber,
      });
    }
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
            {
              this.state.start &&
                <BlockListView
                  start={this.state.start}
                  count={HOME_BLOCK_COUNT}
                />
            }
          </div>
          <div className="six columns" />
        </div>
      </div>
    );
  }
}

export default Home;
