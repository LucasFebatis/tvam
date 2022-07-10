import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'doctor',
  alias: ['d'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info, error },
      system
    } = toolbox

    let resultTizen = system.run('tizen version')
    let resultWebOs = system.run('ares --version')

    info(``)

    resultTizen
      .then(result => {
        info(`Tizen CLI encontrado\n`)
        info(resultTizen)
      })
      .catch(() => {
        error(`Tizen CLI não encontrado`)
        error(
          `Garanta que Tizen CLI esteja instalado corretamente e incluso no PATH\n`
        )
      })

    resultWebOs
      .then(result => {
        info(`webOS TV CLI encontrado\n`)
        info(resultWebOs)
      })
      .catch(() => {
        error(`webOS TV CLI não encontrado`)
        error(
          `Garanta que webOS TV CLI esteja instalado corretamente e incluso no PATH\n`
        )
      })
  }
}
