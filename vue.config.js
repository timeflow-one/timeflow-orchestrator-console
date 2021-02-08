// set vue app version
process.env.VUE_APP_VERSION = process.env.npm_package_version

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/timeflow-orchestrator-console/'
}
