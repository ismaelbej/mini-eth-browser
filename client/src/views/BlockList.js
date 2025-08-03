import React from 'react';
import {
  Grid,
  Header,
  Loader,
  Icon,
} from 'semantic-ui-react';
import { useSearchParams } from 'react-router-dom';
import BlockListComponent from '../components/BlockList';
import PrevNext from '../components/PrevNext';
import { useBlockListQuery } from '../hooks/useBlockListQuery';

const BlockListView = ({
  prevBlock = -1,
  nextBlock = -1,
  count = 20,
  blocks = [],
}) => (
  <>
    <PrevNext
      hasPrev={prevBlock >= 0}
      prev={`/block/?start=${prevBlock}&count=${count}`}
      hasNext={nextBlock >= 0}
      next={`/block/?start=${nextBlock}&count=${count}`}
    />
    <BlockListComponent blocks={blocks} />
  </>
);

function parseParams(start, count) {
  if (typeof start === 'string' && start.length > 0) {
    start = parseInt(start, 10);
  } else {
    start = undefined;
  }
  if (typeof count === 'string' && count.length > 0) {
    count = parseInt(count, 10);
  } else {
    count = undefined;
  }
  return {
    start,
    count,
  };
}

function BlockList() {
  const [searchParams] = useSearchParams();
  const { start, count } = parseParams(searchParams.get('start'), searchParams.get('count'));
  
  const { data, isLoading: loading, error } = useBlockListQuery(start, count);

  if (error) {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Blocks</Header>
            <div>Error loading blocks: {error.message}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">
            <Icon name="cubes" />
            Blocks
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {loading 
            ? <Loader active inline size="tiny" />
            : <BlockListView {...data} />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default BlockList;
