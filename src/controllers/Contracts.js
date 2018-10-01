import { readdir, readFile } from 'fs';
import { join } from 'path';
import * as abiParser from 'ethereumjs-abi';
import { BN } from 'bn.js';

const contracts = {};
const events = {};
const methods = {};

function addEvent(abiEntry) {
  const eventId = abiParser
    .eventID(abiEntry.name, abiEntry.inputs.map(input => input.type))
    .toString('hex');
  events[eventId] = abiEntry;
}

function addFunction(abiEntry) {
  const methodId = abiParser
    .methodID(abiEntry.name, abiEntry.inputs.map(input => input.type))
    .toString('hex');
  methods[methodId] = abiEntry;
}

function addABI(abiArray) {
  abiArray.forEach((abiEntry) => {
    if (abiEntry.name) {
      if (abiEntry.type === 'event') {
        addEvent(abiEntry);
      } else {
        addFunction(abiEntry);
      }
    }
  });
}

function addContract(contractName, abi, networks) {
  addABI(abi);
  contracts[contractName] = {
    contractName,
    abi,
    networks,
  };
}

function parseFile(file) {
  return new Promise((resolve, reject) => {
    readFile(file, 'utf8', async (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const contract = JSON.parse(data);
          addContract(contract.contractName, contract.abi, contract.networks);
        } catch (ex) {
          // FIXME: Ignore files with errors
        }
        resolve();
      }
    });
  });
}

function parseFromArray(abiArray) {
  abiArray.forEach((abiEntry) => {
    addContract(abiEntry.contractName, abiEntry.abi, abiEntry.networks);
  });
}

function parseFromDirectory(path) {
  return new Promise((resolve, reject) => {
    readdir(path, async (err, files) => {
      if (err) {
        reject(err);
      } else {
        await Promise.all(Promise.map(files, file => parseFile(join(path, file))));
        resolve();
      }
    });
  });
}

function loadContracts(contractList) {
  if (Array.isArray(contractList)) {
    return parseFromArray(contractList);
  }
  if (typeof contractList === 'string') {
    return parseFromDirectory(contractList);
  }
  return undefined;
}

export async function initialize(config) {
  if (config.contracts) {
    await loadContracts(config.contracts);
  }
}

export function decodeFunction(data) {
  const methodID = data.slice(2, 10);
  const abiEntry = methods[methodID];
  if (abiEntry) {
    const types = abiEntry.inputs.map(input => input.type);
    const params = abiParser.rawDecode(types, Buffer.from(data.slice(10), 'hex'));
    return {
      name: abiEntry.name,
      params: params.map((param, idx) => {
        let value = param;
        if (
          abiEntry.inputs[idx].type.startsWith('bytes') ||
          abiEntry.inputs[idx].type.startsWith('address') ||
          abiEntry.inputs[idx].type.startsWith('string')
        ) {
          value = `0x${param.toString('hex')}`;
        } else if (
          abiEntry.inputs[idx].type.startsWith('uint') ||
          abiEntry.inputs[idx].type.startsWith('int')
        ) {
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
  return undefined;
}

export function decodeLogs(data) {
  return data.map((logEntry) => {
    const eventID = logEntry.topics[0].slice(2);
    const abiEntry = events[eventID];
    if (abiEntry) {
      const types = abiEntry.inputs.reduce((result, input) => {
        if (!input.indexed) {
          return [...result, input.type];
        }
        return result;
      }, []);
      const decodedInput = abiParser.rawDecode(types, Buffer.from(logEntry.data.slice(2), 'hex'));
      let topicIndex = 1;
      let dataIndex = 0;
      const logs = abiEntry.inputs.map((input) => {
        let rawValue;
        if (input.indexed) {
          rawValue = logEntry.topics[topicIndex];
          topicIndex += 1;
        } else {
          rawValue = decodedInput[dataIndex];
          dataIndex += 1;
        }
        let value = rawValue;
        if (
          input.type.startsWith('bytes') ||
          input.type.startsWith('address') ||
          input.type.startsWith('string')
        ) {
          value = `0x${rawValue.toString('hex')}`;
        } else if (input.type.startsWith('uint') || input.type.startsWith('int')) {
          value = new BN(rawValue).toString(10);
        }

        return {
          name: input.name,
          type: input.type,
          value,
        };
      });
      return {
        name: abiEntry.name,
        events: logs,
        address: logEntry.address,
      };
    }
    return undefined;
  });
}

export default {
  decodeFunction,
  decodeLogs,
  initialize,
};
