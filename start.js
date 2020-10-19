require("@babel/register")({
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
    ],
    plugins: ["@babel/plugin-transform-runtime"],
});

module.exports = require("./index.js");
