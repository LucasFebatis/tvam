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
        info(`Tizen CLI encontrado`)
        info(result)
        executeWhere(system, info, error, 'tizen')
      })
      .catch(() => {
        error(`Tizen CLI não encontrado`)
        error(
          `Garanta que Tizen CLI esteja instalado corretamente e incluso no PATH\n`
        )
      })

    resultWebOs
      .then(result => {
        info(`webOS TV CLI encontrado`)
        info(result)
        executeWhere(system, info, error, 'ares')
      })
      .catch(() => {
        error(`webOS TV CLI não encontrado`)
        error(
          `Garanta que webOS TV CLI esteja instalado corretamente e incluso no PATH\n`
        )
      })
  }
}

function executeWhere(system, info, error, command) {
  let resultWhere = system.run(`where ${command}`)

  resultWhere
    .then(result => {
      info(`Caminho: `)
      info(result)
    })
    .catch(() => {
      error(`Erro ao encontrar caminho do SDK`)
    })
}
