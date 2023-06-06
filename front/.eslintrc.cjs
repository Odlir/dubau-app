const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules)
    .reduce((acc, rule) => {
        acc[`jsx-a11y/${rule}`] = 'off';
        return acc;
    }, {});

module.exports = {
    "env": {
        browser: true,
        es2021: true,
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "plugin:react/recommended",
        "eslint-config-prettier",
    ],
    "rules": {
        ...a11yOff,
        "camelcase": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/rule-name": "off",
        "react/button-has-type": "off",
        "react/jsx-props-no-spreading": "off",
        "func-style": ['error', 'declaration', {allowArrowFunctions: true}],
        "import/extensions": [
            "error",
            "always",
            {
                "js": "always",
                "jsx": "always",
            }
        ],
        "quotes": [
            2, "single", {"avoidEscape": true}
        ]
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".json"]
            },
            alias: {
                map: [
                    ["@", "./src"]
                ]
            }
        }
    },
};
