import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'build',
  alias: ['b'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      system,
      filesystem,
      parameters,
      prompt
    } = toolbox

    const resultBuild = await prompt.ask([
      {
        type: 'select',
        name: 'platform',
        message: 'Build to',
        choices: ['Tizen (Samsung)', 'Web OS (LG)', 'Both']
      }
    ])

    let yarnInstall = 'yarn install'
    let yarnBuild = 'yarn build'

    await system.run(`${yarnInstall}`)
    await system.run(`${yarnBuild}`)

    if (
      resultBuild.platform === 'Tizen (Samsung)' ||
      resultBuild.platform === 'Both'
    ) {
      let projectCert = parameters.array[0]

      if (!parameters.first || parameters.first.toLowerCase() === 'tvamDebug') {
        info('Usando perfil de Debug')
        projectCert = 'tvamDebug'
        await generateCertAndProfileIfNecessary(info, system)
      }

      let tizenBuild = `tizen package -t wgt -s ${projectCert}`

      filesystem.copy(`dist`, 'tizenProject/dist', { overwrite: true })
      await system.run(`${tizenBuild}`, { cwd: 'tizenProject' })

      info(``)
      info(
        `Se tudo ocorreu bem vc deve ter um novo wgt na pasta tizenProject esperando para ser instalado ou publicado`
      )
      info(``)
    }

    if (
      resultBuild.platform === 'Web OS (LG)' ||
      resultBuild.platform === 'Both'
    ) {
      let webosBuild = 'ares-package aresProject -o ./aresProject'

      filesystem.copy(`dist`, 'aresProject/dist', { overwrite: true })
      await system.run(`${webosBuild}`)

      info(``)
      info(
        `Se tudo ocorreu bem vc deve ter um novo ipk na pasta aresProject esperando para ser instalado ou publicado`
      )
      info(``)
    }

    info(`build command executed`)
  }
}

async function generateCertAndProfileIfNecessary(info, system) {
  let listProfiles = 'tizen security-profiles list'
  let result = await system.run(`${listProfiles}`)

  info(result)

  if (!result.toLowerCase().includes('tvamdebug')) {
    let whereIsIt = system.which('tizen')
    let tizenPath = 'tizen-studio/tools/ide/bin/tizen'
    let tizenStudioDataPath = 'tizen-studio-data/keystore/author'

    whereIsIt = whereIsIt.replace(tizenPath, tizenStudioDataPath)

    let cmdCertificate = `tizen certificate -a MyTizen -p 1234 -c KR -s Seoul -ct Gangnamgu -o Tizen -n "Gildong Hong" -e gildonghong@example.org -f tvamDebug`
    let cmdProfile = `tizen security-profiles add -n tvamDebug -a ${whereIsIt}/tvamDebug.p12 -p 1234`

    let resultCmdCer = await system.run(`${cmdCertificate}`)
    info(resultCmdCer)
    let resultCmdProfile = await system.run(`${cmdProfile}`)
    info(resultCmdProfile)
  }
}
