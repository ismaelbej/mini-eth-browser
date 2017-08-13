export function writeParams(params = {}) {
  const result = [];
  Object.keys(params).forEach((key) => {
    if (typeof params[key] !== 'undefined') {
      result.push(`${key}=${params[key]}`);
    }
  });
  return result.join('&');
}

export function writeUrl(url, params = {}) {
  const result = writeParams(params);
  return `${url}${result.length > 0 ? `?${result}` : ''}`;
}

export default {
  writeParams,
  writeUrl,
};
