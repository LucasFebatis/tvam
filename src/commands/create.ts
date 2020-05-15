
import { prompt, GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'create',
  alias: ['c'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      template: { generate },
    } = toolbox

    // 1. Select Tizen (Samsung) or Web OS (LG) or Both
    // 2. Select Vue.js, React or only Node.js or only Javascript
    // 3. Create Project

    const result = await prompt.ask([
      {
        type: 'select',
        name: 'platform',
        message: 'Which platform will you develop?',
        choices: ['Tizen (Samsung)', 'Web OS (LG) (In Roadmap)', 'Both (In Roadmap)'],
      },
      {
        type: 'select',
        name: 'jsFramework',
        message: 'Which framework will you use?',
        choices: ['Vue.js', 'React (In Roadmap)', 'Node.js (In Roadmap)', 'only Javascript (In Roadmap)'],
      },
      {
        type: 'select',
        name: 'packageManager',
        message: 'Which package manager will you use?',
        choices: ['npm', 'yarn'],
      },
    ])

    if (result.platform.includes('(In Roadmap)') || result.platform.includes('(In Roadmap)')) {
      info("Eu falei que esta no Roadmap, vai lá tente outra vez tvam create")
      return
    }

    info("Criando projeto Tizen com Vue.js")

    // let mkdir = 'mkdir myapp'
    // let cmd = system.run(`${mkdir}`)

    generate({
      template: 'vue.package.json',
      target: `myapp/package.json`
    })

    // cmd.then((val) => {
      

    // }).catch((error) => {
    //   info(error)
    // })

  },
}
