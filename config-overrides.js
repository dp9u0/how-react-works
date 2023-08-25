const {
  override,
  overrideDevServer,
} = require("customize-cra");

module.exports = {
  webpack: override((config) => {
    return config
  }),
  devServer: overrideDevServer((config) => {
    return config
  }
  )
};