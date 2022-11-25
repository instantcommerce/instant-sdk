module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [1, 'always', 72],
    'body-max-line-length': [1, 'always', 80],
  },
};
