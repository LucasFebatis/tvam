import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'serve',
  alias: ['s'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { error }
    } = toolbox
    error(`serve command não implementado`)
  }
}
