import {
  readdir,
  readFile,
} from 'fs';
import {
  join,
} from 'path';
import * as abiDecoder from 'abi-decoder';
import config from '../config';

class Contracts {
  constructor() {
    this.contracts = {};
    this.functions = {};
    this.loadContracts(config.contracts);
  }

  loadContracts(path) {
    readdir(path, (err, files) => {
      if (!err) {
        files.forEach(file => this.parseFile(join(path, file)));
      } else {
        //console.log(err);
      }
    });
  }

  parseFile(file) {
    readFile(file, 'utf8', (err, data) => {
      if (!err) {
        const contract = JSON.parse(data);
        this.addContract(contract.contractName, contract.abi, contract.networks);
      } else {
        //console.log(err);
      }
    });
  }

  addContract(contractName, abi, networks) {
    abiDecoder.addABI(abi);
    this.contracts[contractName] = {
      contractName,
      abi,
      networks,
    };
  }

  decodeFunction(data) {
    return abiDecoder.decodeMethod(data);
  }

  decodeLogs(data) {
    return abiDecoder.decodeLogs(data);
  }
}

export default new Contracts();
