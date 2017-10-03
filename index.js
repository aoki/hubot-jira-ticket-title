const Fs = require('fs')
const Path = require('path')

module.exports = robot => {
  const path = Path.resolve(__dirname, 'scripts')
  Fs.exists(path, exists => {
    if (exists) {
      Fs.readdirSync(path).forEach( file => {
        robot.loadFile(path, file)
      })
    }
  })
}
