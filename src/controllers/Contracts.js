import {
  readdir,
  readFile,
} from 'fs';
import {
  join,
} from 'path';
import * as abiParser from 'ethereumjs-abi';
import { BN } from 'bn.js';

class Contracts {
  constructor() {
    this.contracts = {};
    this.events = {};
    this.methods = {};
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
    this.addABI(abi);
    this.contracts[contractName] = {
      contractName,
      abi,
      networks,
    };
  }

  addABI(abiArray) {
    abiArray.forEach((abiEntry) => {
      if (abiEntry.name) {
        if (abiEntry.type === 'event') {
          this.addEvent(abiEntry);
        } else {
          this.addFunction(abiEntry);
        }
      }
    });
  }

  addEvent(abiEntry) {
    const eventId = abiParser.eventID(abiEntry.name, abiEntry.inputs.map(input => input.type)).toString('hex');
    this.events[eventId] = abiEntry;
  }

  addFunction(abiEntry) {
    const methodId = abiParser.methodID(abiEntry.name, abiEntry.inputs.map(input => input.type)).toString('hex');
    this.methods[methodId] = abiEntry;
  }

  decodeFunction(data) {
    const methodID = data.slice(2, 10);
    const abiEntry = this.methods[methodID];
    if (abiEntry) {
      const types = abiEntry.inputs.map(input => input.type);
      const params = abiParser.rawDecode(types, Buffer.from(data.slice(10), 'hex'));
      return {
        name: abiEntry.name,
        params: params.map((param, idx) => {
          let value = param;
          if (abiEntry.inputs[idx].type.startsWith('bytes') ||
              abiEntry.inputs[idx].type.startsWith('address') ||
              abiEntry.inputs[idx].type.startsWith('string')) {
            value = `0x${param.toString('hex')}`;
          } else if (abiEntry.inputs[idx].type.startsWith('uint') ||
              abiEntry.inputs[idx].type.startsWith('int')) {
            value = new BN(param).toString(10);
          }
          return {
            name: abiEntry.inputs[idx].name,
            value,
            type: abiEntry.inputs[idx].type,
          };
        }),
      };
    }
    return {};
  }

  decodeLogs(data) {
    return {};
  }
}

export default new Contracts();
