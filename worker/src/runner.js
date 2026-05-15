const vm = require('vm');

function normalize(value) {
  return String(value || '').trim().replace(/\s+/g, '').toLowerCase();
}

function runJavaScript(code, input) {
  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push(args.join(' ')),
    },
    module: { exports: {} },
    exports: {},
  };

  vm.createContext(sandbox);
  vm.runInContext(`${code}\nmodule.exports = typeof solve === 'function' ? solve : module.exports;`, sandbox, {
    timeout: 1000,
  });

  if (typeof sandbox.module.exports !== 'function') {
    throw new Error('Define a solve(input) function');
  }

  const output = sandbox.module.exports(input);
  return output === undefined ? logs.join('\n') : String(output);
}

function judgeSubmission({ language, code, tests }) {
  if (language !== 'javascript') {
    return {
      status: 'runtime_error',
      runtime: 0,
      error: 'Only JavaScript is enabled in the MVP worker',
    };
  }

  let runtime = 0;

  for (const test of tests) {
    const startedAt = Date.now();
    const output = runJavaScript(code, test.input);
    runtime += Date.now() - startedAt;

    if (normalize(output) !== normalize(test.expected_output)) {
      return { status: 'wrong_answer', runtime };
    }
  }

  return { status: 'accepted', runtime };
}

module.exports = {
  judgeSubmission,
};
