module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': [
    "eslint:recommended",
    'standard'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
        'error',2
    ],
    'linebreak-style': [
        'error',
        'unix'
    ],
    'quotes': [
        'error',
        'single'
    ],
    'semi': [
        'error',
        'never'
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
        "error", "always"
    ],
    "arrow-spacing": [
        "error", { "before": true, "after": true }
    ],
    "no-console": 0
}
}
