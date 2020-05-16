
import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'doctor',
  alias: ['d'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      system
    } = toolbox

    let result = await system.run('tizen version')

    if(result.includes('command not found')) {
      info(`Tizen CLI não encontrado`)
      info(`Garanta que Tizen CLI esteja instalado corretamente e incluso no PATH`)
    } else {
      info(`Tizen CLI encontrado`)
      info(result)
    }

    info(`doctor command executed`)
  },
}
