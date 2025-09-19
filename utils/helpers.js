const { expect: baseExpect } = require('@playwright/test');

function createCustomExpect(options = {}) {
  const { prefix = 'BUG', includeOriginalMessage = false } = options;

  function wrapMatchers(matchers) {
    return new Proxy(matchers, {
      get(target, property) {
        const value = target[property];
        if (typeof value !== 'function') return value;
        return (...args) => {
          try {
            const result = value.apply(target, args);
            if (result && typeof result.then === 'function') {
              return result.catch((err) => {
                const message = includeOriginalMessage
                  ? `${prefix}: ${err.message}`
                  : `${prefix}: Assertion ${String(property)} failed`;
                throw new Error(message);
              });
            }
            return result;
          } catch (err) {
            const message = includeOriginalMessage
              ? `${prefix}: ${err.message}`
              : `${prefix}: Assertion ${String(property)} failed`;
            throw new Error(message);
          }
        };
      },
    });
  }

  const customExpect = (actual, ...rest) => {
    const matchers = baseExpect(actual, ...rest);
    return wrapMatchers(matchers);
  };

  // copy static properties (e.g., expect.poll, expect.soft, etc.)
  Object.keys(baseExpect).forEach((key) => {
    customExpect[key] = baseExpect[key];
  });

  return customExpect;
}

// Default export: concise custom message without original verbose details
const expect = createCustomExpect({ prefix: 'BUG', includeOriginalMessage: false });

module.exports = { expect, createCustomExpect };


