import moment from 'moment';

export function formatTimestamp(timestamp) {
  return moment(new Date(timestamp * 1000)).format();
}

export default {
  formatTimestamp,
};
