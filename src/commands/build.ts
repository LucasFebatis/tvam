
import { GluegunToolbox } from 'gluegun'


module.exports = {
  name: 'build',
  alias: ['b'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      system,
      parameters
    } = toolbox

    let projectCert = parameters.first

    if (!parameters.first || parameters.first.toLowerCase() == "tvamDebug") {
      info('Usando perfil de Debug')
      projectCert = "tvamDebug"
      generateCertAndProfileIfNecessary(info, system)
    }

    let yarnInstall = 'yarn install'
    let yarnBuild = 'yarn build'
    let cpDist = 'cp -av dist tizenProject'
    let cdIn = 'cd tizenProject'
    let tizenBuild = `tizen package -t wgt -s ${projectCert}`

    let result = await system.run(`${yarnInstall};${yarnBuild};${cpDist};${cdIn};${tizenBuild}`)

    info(result)
    info(``)
    info(`Se tudo ocorreu bem vc deve ter um novo wgt na pasta tizenProject esperando para ser instalado ou publicado`)
    info(``)

    info(`build command executed`)
  },
}

async function generateCertAndProfileIfNecessary(info, system) {

  let listProfiles = "tizen security-profiles list"
  let result = await system.run(`${listProfiles}`)

  info(result)

  if (!result.toLowerCase().includes('tvamdebug')) {

    let whereIsIt = system.which('tizen')
    let tizenPath = "tizen-studio/tools/ide/bin/tizen"
    let tizenStudioDataPath = "tizen-studio-data/keystore/author"

    whereIsIt = whereIsIt.replace(tizenPath, tizenStudioDataPath)

    let cmdCertificate = `tizen certificate -a MyTizen -p 1234 -c KR -s Seoul -ct Gangnamgu -o Tizen -n "Gildong Hong" -e gildonghong@example.org -f tvamDebug`
    let cmdProfile = `tizen security-profiles add -n tvamDebug -a ${whereIsIt}/tvamDebug.p12 -p 1234`

    let resultCmdCer = await system.run(`${cmdCertificate}`)
    info(resultCmdCer)
    let resultCmdProfile = await system.run(`${cmdProfile}`)
    info(resultCmdProfile)
  }

}