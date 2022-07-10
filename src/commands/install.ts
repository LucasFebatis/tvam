import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'install',
  alias: ['i'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      system,
      parameters,
      prompt
    } = toolbox

    if (parameters.first) {
      if (parameters.first.includes('.wgt')) {
        let localInstall = `tizen install -n ${parameters.first} -- ./`
        let localResult = await system.run(`${localInstall}`)
        info(localResult)
        return
      } else if (parameters.first.includes('.ipk')) {
        info(``)

        let listAresDevicesCmd = 'ares-setup-device --list'
        let listAresDevices = await system.run(`${listAresDevicesCmd}`)

        info(listAresDevices)

        const resultAresAsk = await prompt.ask([
          {
            type: 'input',
            name: 'tvName',
            message: 'Tv Name'
          }
        ])

        let localInstall = `ares-install ${parameters.first} -d ${resultAresAsk.tvName}`
        let localResult = await system.run(`${localInstall}`)
        info(localResult)
        return
      } else {
        info('Arquivo não suportado')
        return
      }
    }

    const resultInstall = await prompt.ask([
      {
        type: 'select',
        name: 'platform',
        message: 'Install in',
        choices: ['Tizen (Samsung)', 'Web OS (LG)']
      }
    ])

    if (resultInstall.platform === 'Tizen (Samsung)') {
      let installTizen = `tizen install -n tizenProject.wgt -- ./`
      await system.run(`${installTizen}`, { cwd: 'tizenProject' })

      info(``)
      info(
        `Se a instalação foi sucedida e o app não é mostrado, pode ser que vc precise reiniciar a tv ou o emulador`
      )
      info(``)
    }

    if (resultInstall.platform === 'Web OS (LG)') {
      info(``)

      const resultAresAskWhere = await prompt.ask([
        {
          type: 'select',
          name: 'where',
          message: 'Install webOS app in',
          choices: ['Simulator', 'Emulator']
        }
      ])

      if (resultAresAskWhere.where === 'Simulator') {
        await installInWebOSSimulator(system, info)
      } else if (resultAresAskWhere.where === 'Emulator') {
        await  installInWebOSEmulator(system, info, prompt)
      }

      info(``)
      info(
        `Se a instalação foi sucedida e o app não é mostrado, pode ser que vc precise reiniciar a tv ou o emulador`
      )
      info(``)
    }

    info(`install command executed`)
  }
}



async function installInWebOSSimulator(system, info) {
  let installwebOS = `ares-launch -s 22 ./`
  await system.run(`${installwebOS}`, { cwd: 'aresProject' })
}

async function installInWebOSEmulator(system, info, prompt) {

  let listAresDevicesCmd = 'ares-setup-device --list'
  let listAresDevices = await system.run(`${listAresDevicesCmd}`)

  info(listAresDevices)

  const resultAresAsk = await prompt.ask([
    {
      type: 'input',
      name: 'tvName',
      message: 'Tv Name'
    }
  ])

  let installwebOS = `ares-install com.example.sampleapp_0.0.1_all.ipk -d ${resultAresAsk.tvName}`
  await system.run(`${installwebOS}`, { cwd: 'aresProject' })

}