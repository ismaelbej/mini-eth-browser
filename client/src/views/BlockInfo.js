import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import BlockInfoComponent from '../components/BlockInfo';
import BlockInfoController from '../controllers/BlockInfo';

class BlockInfo extends React.Component {
  constructor(props) {
    super(props);
    const { hash } = props.match.params;
    this.state = {
      hash,
      block: undefined,
      nextBlock: undefined,
      prevBlock: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    this.controller = new BlockInfoController();
    this.controller.on('block', block => this.handleBlock(block));
    this.controller.on('fail', err => this.handleFailure(err));
    this.controller.initialize(this.state.hash);
  }

  componentWillReceiveProps(nextProps) {
    const { hash } = nextProps.match.params;
    if (this.state.hash !== hash) {
      this.controller.loadBlock(hash);
      this.setState({
        hash,
      });
    }
  }

  handleBlock({ block, nextBlock, prevBlock }) {
    this.setState({
      block,
      nextBlock,
      prevBlock,
    });
  }

  handleFailure(err) {
    this.setState({
      block: undefined,
      nextBlock: undefined,
      prevBlock: undefined,
    });
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Block</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {this.state.prevBlock && <Link to={`/block/${this.state.prevBlock}`} className="button button-primary">Previous</Link>}
            {this.state.prevBlock && '\u00a0'}
            {this.state.nextBlock !== false && <Link to={`/block/${this.state.nextBlock}`} className="button button-primary">Next</Link>}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <BlockInfoComponent block={this.state.block} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BlockInfo;
