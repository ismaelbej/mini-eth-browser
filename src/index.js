import 'dotenv/config'
import { createApp, createServer } from './app.js';
import ethereum from './services/ethereum.js';
import config from './config.js';

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const main = async (config) => {
  const web3 = ethereum(config);
  const app = createApp(web3);
  createServer(app, config.port);
}

main(config)
