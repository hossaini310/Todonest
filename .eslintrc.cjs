/* eslint-env node */
module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  env: {
    'vue/setup-compiler-macros': true,
    'vue/no-use-v-if-with-v-for': true,
  },
};
