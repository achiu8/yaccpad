export default (f, interval = 250) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => f(...args), interval);
  };
};
