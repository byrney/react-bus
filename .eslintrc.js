module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        // possible errors
        "no-template-curly-in-string": "error",
        // best practices
        "curly": [ "error", "all" ],
        "dot-location": ["error", "property"],
        "eqeqeq": "error",
        "no-eval": "error",
        "no-implicit-globals": "error",
        "no-loop-func": "error",
        "no-multi-spaces": "error",
        "no-script-url": "error",
        "radix": ["error", "always"],
        // variables
        "init-declarations": ["error", "always"],
        "no-shadow": "error",
        "no-unused-vars": ["off", {"varsIgnorePattern": "_"}],
        // "no-use-before-define": ["error", {
        //     "functions": false
        // }],
        //Node.js and CommonJS
        "no-mixed-requires": "error",
        // stylistic issues
        "brace-style": ["error", "1tbs", {
            "allowSingleLine": true
        }],
        "comma-dangle": ["error", "never"],
        "comma-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "func-call-spacing": ["error", "never"],
        "id-length": ["error", {
            "exceptions": ["i","j","k","r","$","_", "x", "y"]
        }], // min is 2 chars
        "indent": ["error", 4],
        "max-depth": ["error", 4],
        "max-len": ["error", 120, {
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreRegExpLiterals": true,
            "ignoreTemplateLiterals": true
        }],
        "new-cap": "error",
        "no-trailing-spaces": "error",
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        // ES6
        "arrow-spacing": "error",
        "no-var": "error",
        "prefer-const": "error",
        "prefer-template": "error",
        "no-console": "warn",
        "no-debugger": 'warn'
    }
};
// For more info and more detailed explanations about the linting rules applied
// see: http://eslint.org/docs/rules/
// How to turn off specific rule for a specific line of code:
// see: https://stackoverflow.com/questions/27732209/turning-off-eslint-rule-for-a-specific-line
