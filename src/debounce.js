export default (f, interval = 500) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => f(...args), interval);
  };
};
