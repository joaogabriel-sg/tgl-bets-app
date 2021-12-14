module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@routes": "./src/routes",
            "@store": "./src/store",
            "@shared": "./src/shared",
          },
        },
      ],
    ],
  };
};
