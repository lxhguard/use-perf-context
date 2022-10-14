module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "parserOptions": {
        "ecmaVersion": 12,
        "project": "./tsconfig.json",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "tsx": true
        },
        "extraFileExtensions": [".vue", ".json"]
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "globals": {
        "window": true
    },
    "extends": [],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
};

