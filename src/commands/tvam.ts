import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'tvam',
  run: async toolbox => {
    const { print, system } = toolbox

    print.info('Welcome to your CLI')

    let resultHelp = await system.run('tvam h')
    print.info(resultHelp)
  }
}

module.exports = command
