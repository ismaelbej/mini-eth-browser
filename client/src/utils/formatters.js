import moment from 'moment';
import BN from 'bn.js';

const HASH_LENGTH = 20;

export function formatTimestamp(timestamp) {
  return moment(new Date(timestamp * 1000)).format();
}

export function formatElapsed(timestamp) {
  return moment(new Date(timestamp * 1000)).fromNow();
}

export function formatHash(hash, length = HASH_LENGTH) {
  return hash.length > length ? `${hash.substr(0, length - 2)}..` : hash;
}

export const formatAddress = formatHash;

export function formatAmount(amountParam) {
  const amount = new BN(amountParam);
  const units = [
    'wei',
    'Kwei',
    'Mwei',
    'Gwei',
    'szabo',
    'finney',
  ];
  if (amount.isZero()) {
    return '0';
  }
  let i = 0;
  while (i < units.length) {
    if (amount.ltn(1000)) {
      return `${amount.toString()} ${units[i]}`;
    }
    amount.idivn(1000);
    i += 1;
  }
  return `${amount.toFormat()} ether`;
}

export function formatText(data, enc = 'utf8') {
  if (data === '0x0' || data === '0x') {
    return '';
  }
  if (data.startsWith('0x')) {
    return Buffer.from(data.slice(2), 'hex').toString(enc);
  }
  return Buffer.from(data).toString(enc);
}

export default {
  formatAddress,
  formatAmount,
  formatHash,
  formatText,
  formatTimestamp,
};
