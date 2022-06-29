const manifest = require('./public/manifest.json')

module.exports = {
  pwa: {
    name: manifest.short_name,
    themeColor: manifest.theme_color,
    msTileColor: manifest.background_color,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    }
  }
}