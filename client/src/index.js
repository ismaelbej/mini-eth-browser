import { app, h } from 'hyperapp';

const actions = {};

const state = {
  block: {},
  gasPrice: 0,
};

const view = ({block, gasPrice}) => (
  <div>
    <section>
      <ul>
        <li>Block: {block.timestamp}</li>
        <li>Gas Price: {gasPrice}</li>
      </ul>
    </section>
  </div>
);

app(state, actions, view, document.getElementById('app'));

