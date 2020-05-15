
import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'install',
  alias: ['i'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
    } = toolbox
    info(`install command executed`)
  },
}
