module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      [
        "module-resolver",
        {
          root: ["./app"],
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".ts",
            ".tsx",
            ".json",
            ".svg",
          ],
          alias: {
            "@/assets": "./app/assets",
            "@/components": "./app/components",
            "@/constants": "./app/constants",
            "@/hooks": "./app/hooks",
            "@/i18n": "./app/i18n",
            "@/navigation": "./app/navigation",
            "@/screens": "./app/screens",
            "@/services": "./app/services",
            "@/timeout": "./app/timeout",
            "@/reduxfile": "./app/reduxfile",
            "@/utils": "./app/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
