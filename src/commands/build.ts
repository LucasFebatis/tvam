
import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'build',
  alias: ['b'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
    } = toolbox
    info(`build command executed`)
  },
}
