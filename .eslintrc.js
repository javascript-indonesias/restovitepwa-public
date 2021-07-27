// https://eslint.org/docs/user-guide/configuring/rules#configuring-rules
// https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-file-formats
// https://eslint.org/docs/rules/
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier', 'eslint:recommended'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        // https://stackoverflow.com/questions/56280222/airbnb-eslint-prettier-conflict-over-switch-and-case-indentation
        indent: ['error', 4, { SwitchCase: 1 }],
        'arrow-parens': ['error', 'always'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'comma-dangle': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: ['error', 'always'],
        quotes: ['warn', 'single'],
        'no-unused-vars': [
            'warn',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
        'prettier/prettier': ['error'],
        'class-methods-use-this': ['warn'],
    },
};
