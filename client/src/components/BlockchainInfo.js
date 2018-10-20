import { h } from 'hyperapp';

const InfoTag = ({ text, value }) => (
  <div className="control">
    <div className="tags has-addons">
      <span className="tag is-primary is-medium">{text}</span>
      <span className="tag is-light is-medium">{value}</span>
    </div>
  </div>
);

export default ({
  blocks,
  gasPrice,
  timestamp,
  hashrate,
  mining,
}) => (
  <section className="section">
    <div className="container">
      <div className="field is-grouped is-grouped-multiline">
        <InfoTag text="Blocks" value={blocks} />
        <InfoTag text="Gas price" value={gasPrice} />
        <InfoTag text="Date" value={timestamp} />
        <InfoTag text="Hash rate" value={hashrate} />
        <InfoTag text="Mining" value={mining} />
      </div>
    </div>
  </section>
);
