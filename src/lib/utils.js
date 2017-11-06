export function parseQueryParams(query) {
  let start;
  if (typeof query.start === 'string') {
    start = parseInt(query.start, 10);
  }
  let count;
  if (typeof query.count === 'string') {
    count = parseInt(query.count, 10);
  }
  return {
    start,
    count,
  };
}

export default {
  parseQueryParams,
};
