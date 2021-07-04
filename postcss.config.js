module.exports = {
    plugins: {
        "postcss-preset-env": {
            preserve: false,
            autoprefixer: true,
            importFrom: ["./src/variables.css"],
            features: {
                "focus-visible-pseudo-class": false,
                "focus-within-pseudo-class": false,
            },
        },
    },
};
