module.exports = [
    {
        rules: {
            semi: "error",
            "comma-dangle": ["warn", {
                "arrays": "always",
                "objects": "always",
                "imports": "never",
                "exports": "never",
                "functions": "never"
            }]
        }
    }
];