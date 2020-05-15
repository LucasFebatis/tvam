
import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'serve',
  alias: ['s'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
    } = toolbox
    info(`serve command executed`)
  },
}
