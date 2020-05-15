
import { prompt, GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'create',
  alias: ['c'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      template: { generate },
      system
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
      }
    ])

    if (result.platform.includes('(In Roadmap)') || result.platform.includes('(In Roadmap)')) {
      info("Eu falei que esta no Roadmap, vai lá tente outra vez tvam create")
      return
    }

    info("Criando projeto Tizen com Vue.js")

    let mkdir = 'mkdir myapp'
    await system.run(`${mkdir}`)

    generateVueJs(generate)

    let cdIn = 'cd myapp'

    let createTizen = 'tizen create web-project -n tizenProject -t BasicEmptyProject -p tv-samsung-5.0'
    await system.run(`${cdIn};${createTizen}`)

    prepareTizenProject(system, generate)
    
    info('Projeto criado')
    // Mostrar comandos
    // Mostrar docs
  },
}

function generateVueJs(generate) {
  
  generate({
    template: 'vuejs/dist/index.html',
    target: `myapp/dist/index.html`
  })

  generate({
    template: 'vuejs/src/App.vue',
    target: `myapp/src/App.vue`
  })

  generate({
    template: 'vuejs/src/index.js',
    target: `myapp/src/index.js`
  })

  generate({
    template: 'vuejs/.gitignore',
    target: `myapp/.gitignore`
  })

  generate({
    template: 'vuejs/README.md',
    target: `myapp/README.md`
  })

  generate({
    template: 'vuejs/package.json',
    target: `myapp/package.json`
  })

  generate({
    template: 'vuejs/webpack.config.js',
    target: `myapp/webpack.config.js`
  })
}

function prepareTizenProject(system, generate) {

  // Remover index.html e main.js e pasta css
  let cdIn = 'cd myapp/tizenProject'
  let remove = 'rm -rf index.html main.js css'
  system.run(`${cdIn};${remove}`)

  // Modificar config.xml
  generate({
    template: 'tizen/config.xml',
    target: `myapp/tizenProject/config.xml`
  })

  // Add .gitignore
  generate({
    template: 'tizen/.gitignore',
    target: `myapp/tizenProject/.gitignore`
  })

}