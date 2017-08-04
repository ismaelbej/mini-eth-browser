import moment from 'moment';

const HASH_LENGTH = 20;

export function formatTimestamp(timestamp) {
  return moment(new Date(timestamp * 1000)).format();
}

export function formatHash(hash, length = HASH_LENGTH) {
  return hash.length > length ? hash.substr(0, length - 2) + '..' : hash;
}

export const formatAddress = formatHash;

export default {
  formatAddress,
  formatHash,
  formatTimestamp,
};
