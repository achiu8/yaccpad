export default (f, interval = 1000) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => f(...args), interval);
  };
};
