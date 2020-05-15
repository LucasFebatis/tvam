
import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'install',
  alias: ['i'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      system
    } = toolbox
    
    let cdIn = 'cd tizenProject'
    let createTizen = `tizen install -n tizenProject.wgt -- ./`
    let result = await system.run(`${cdIn};${createTizen}`)
    
    info(result)
    info(``)
    info(`Se a instalação foi sucedida e o app não é mostrado, pode ser que vc precise reiniciar a tv ou o emulador`)
    info(``)
    info(`install command executed`)
  },
}
