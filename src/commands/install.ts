
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
      if (parameters.first.includes(".wgt")) {
        let localInstall = `tizen install -n ${parameters.first} -- ./`
        let localResult = await system.run(`${localInstall}`)
        info(localResult)
        return
      }

      else if (parameters.first.includes(".ipk")) {
        let localInstall = `ares-install ${parameters.first}`
        let localResult = await system.run(`${localInstall}`)
        info(localResult)
        return
      }

      else {
        info("Arquivo não suportado")
        return
      }

    }

    const resultInstall = await prompt.ask([
      {
        type: 'select',
        name: 'platform',
        message: 'Install in',
        choices: ['Tizen (Samsung)', 'Web OS (LG)'],
      },
    ])

    if (resultInstall.platform === "Tizen (Samsung)") {

      let cdIn = 'cd tizenProject'
      let installTizen = `tizen install -n tizenProject.wgt -- ./`
      await system.run(`${cdIn};${installTizen}`)

      info(``)
      info(`Se a instalação foi sucedida e o app não é mostrado, pode ser que vc precise reiniciar a tv ou o emulador`)
      info(``)

    }

    if (resultInstall.platform === "Web OS (LG)") {

      info(``)

      let listAresDevicesCmd = "ares-setup-device --list"
      let listAresDevices = await system.run(`${listAresDevicesCmd}`)

      info(listAresDevices)

      const resultAresAsk = await prompt.ask([
        {
          type: 'input',
          name: 'tvName',
          message: 'Tv Name',
        },
      ])

      let cdIn = 'cd aresProject'
      let installwebOS = `ares-install com.example.sampleapp_0.0.1_all.ipk -d ${resultAresAsk.tvName}`
      await system.run(`${cdIn};${installwebOS}`)

      info(``)
      info(`Se a instalação foi sucedida e o app não é mostrado, pode ser que vc precise reiniciar a tv ou o emulador`)
      info(``)

    }

    info(`install command executed`)
  },
}
