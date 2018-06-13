import {
  readdir,
  readFile,
} from 'fs';
import {
  join,
} from 'path';
import * as abiDecoder from 'abi-decoder';

class Contracts {
  constructor() {
    this.contracts = {};
    this.functions = {};
  }

  initialize(contractsPath) {
    if (contractsPath) {
      return this.loadContracts(contractsPath);
    }
    return Promise.resolve();
  }

  loadContracts(path) {
    return new Promise((resolve, reject) => {
      readdir(path, async (err, files) => {
        if (err) {
          reject(err);
        } else {
          await Promise.all(files.map(file => this.parseFile(join(path, file))));
          resolve();
        }
      });
    });
  }

  parseFile(file) {
    return new Promise((resolve, reject) => {
      readFile(file, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const contract = JSON.parse(data);
          this.addContract(contract.contractName, contract.abi, contract.networks);
          resolve();
        }
      });
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
