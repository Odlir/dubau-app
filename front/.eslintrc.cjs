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
        "react/react-in-jsx-scope": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
        "quotes": [
            2, "single", {"avoidEscape": true}
        ]
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx"]
            },
            alias: {
                map: [
                    ["@", "./src"]
                ]
            }
        }
    },
};
