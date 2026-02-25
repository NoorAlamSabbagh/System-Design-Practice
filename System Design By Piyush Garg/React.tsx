function withLogging(fn) {
    console.log("Setting up logging", fn);
  return function (...args) {
    console.log("Arguments:", args);
    console.log("Calling function");
    return fn(...args);
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = withLogging(add);
loggedAdd(2, 3);
