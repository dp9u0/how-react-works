const {
  override,
  overrideDevServer,
} = require("customize-cra");

module.exports = {
  webpack: override((config) => {
    config.externals = {
      "react": "React",
      "react-dom": "ReactDOM"
    }
    return config
  }),
  devServer: overrideDevServer((config) => {
    // config.externals = {
    //   "react": "React",
    //   "react-dom": "ReactDOM"
    // }
    return config
  }
  )
};