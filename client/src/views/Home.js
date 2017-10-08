import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
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
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Home</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3">Recent blocks</Header>
            {this.state.blocks && <BlockList blocks={this.state.blocks} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
