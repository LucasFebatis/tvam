
import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'build',
  alias: ['b'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      system
    } = toolbox

    let yarnInstall = 'yarn install'
    let yarnBuild = 'yarn build'
    let cpDist = 'cp -av dist tizenProject'
    let cdIn = 'cd tizenProject'
    let tizenBuild = 'tizen package -t wgt -s emulator'

    let result = await system.run(`${yarnInstall};${yarnBuild};${cpDist};${cdIn};${tizenBuild}`)
    
    info(result)
    info(``)
    info(`Se tudo ocorreu bem vc deve ter um novo wgt na pasta tizenProject esperando para ser instalado ou publicado`)
    info(``)

    info(`build command executed`)
  },
}
