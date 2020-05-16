
import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'doctor',
  alias: ['d'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      system
    } = toolbox

    let resultTizen = await system.run('tizen version')
    let resultWebOs = await system.run('ares --version')

    if(resultTizen.includes('command not found')) {
      info(`Tizen CLI não encontrado`)
      info(`Garanta que Tizen CLI esteja instalado corretamente e incluso no PATH`)
    } else {
      info(`Tizen CLI encontrado`)
      info(resultTizen)
    }

    if(resultWebOs.includes('command not found')) {
      info(`webOS TV CLI não encontrado`)
      info(`Garanta que webOS TV CLI esteja instalado corretamente e incluso no PATH`)
    } else {
      info(`webOS TV CLI encontrado`)
      info(resultWebOs)
    }

    info(`doctor command executed`)
  },
}
