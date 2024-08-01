// craco.config.js (in root)
const path = require("path");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.paths.json");
module.exports = {
  webpack: {
    alias: {
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/data": path.resolve(__dirname, "./src/data"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/store": path.resolve(__dirname, "./src/store"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/tests": path.resolve(__dirname, "./src/tests"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  jest: {
    configure: {
      preset: "ts-jest",
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/src/",
      }),
    },
  },
};
