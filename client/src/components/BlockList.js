import { h } from 'hyperapp';

export default ({ blocks }) => (
  <section className="section">
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Hash</th>
            <th>Date</th>
            <th>Miner</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map(({
            number,
            hash,
            miner,
            timestamp,
          }) => (
            <tr key={hash}>
              <td>{number}</td>
              <td>{hash}</td>
              <td>{timestamp}</td>
              <td>{miner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);
